import re
import os
import json
import docx

from collections import defaultdict
from docx import Document
from docx.shared import Cm


# TODO: Improve custom table style in template.docx
DOC_STYLE = 'SALCC_style'

DATA_DIR = '../public/data'

# Example placeholder: {{label:title}}
PLACEHOLDER_REGEX = re.compile(r'{{(?P<scope>\w+):(?P<key>\w+)}}')


def create_report(unit_id, path, config):
    """
        Creates report for summary unit in docx format.

    Parameters
    ----------
    unit_id: string id of a summary unit
    path: string location where docx to be saved
    config: dict of json data from src/config

    Returns
    -------
    report: docx file

    """
    doc = Document('template.docx')

    context = generate_report_context(unit_id, config)

    for p in doc.paragraphs:
        # Assumption: placeholders are always completely contained within a run
        for r in p.runs:
            # a run may have multiple placeholders
            for match in re.finditer(PLACEHOLDER_REGEX, r.text):
                scope, key = match.groups()

                item = _resolve(scope, key, context)

                if isinstance(item, str):
                    # match.group() has the original text to replace
                    r.text = r.text.replace(match.group(), item)

                    if scope == 'table':
                        # TODO: make "No info available" text more eye-catching
                        r.font.italic = True

                elif scope == 'table':
                    r.text = ''
                    create_table(doc, item, p)

        if '{{INDICATORS}}' in p.text:
            # Remove '{{INDICATORS}}'placeholder and add the report content above empty p.text
            # Because we're not using replace(match.group()) here, everything must be moved into place
            p.text = ''

            ecosystem_insertion_point = p

            for ecosystem in context['ecosystem_indicators']:
                if 'ecosystem_percentage' in ecosystem and ecosystem['ecosystem_percentage'] is not '':
                    heading = ecosystem['ecosystem_name'] + ': ' + str(ecosystem['ecosystem_percentage']) + "% of area"
                    eco_h = doc.add_paragraph(heading, style='Heading13')
                    _move_p_after(eco_h, ecosystem_insertion_point)
                else:
                    heading = ecosystem['ecosystem_name']
                    eco_h = doc.add_paragraph(heading, style='Heading13')
                    _move_p_after(eco_h, ecosystem_insertion_point)

                indicator_insertion_point = eco_h

                if ecosystem['indicators']:
                    for indicator in ecosystem['indicators']:
                        # TODO: reevaluate this boilerplate
                        # indicator_boilerplate = 'The average value of the indicator in the {0}, compared to the South ' \
                        #                         'Atlantic average. The South Atlantic average is the average of ' \
                        #                         'all HUC12 averages in the South Atlantic region.'.format(
                        #                          context['value']['summary_unit_name'])
                        indicator_boilerplate2 = 'The area of {0} values as they occur within the {1} ecosystem in the ' \
                                                 '{2}.'.format(indicator['value']['indicator_name'],
                                                                     ecosystem['ecosystem_name'],
                                                                     context['value']['summary_unit_name'])

                        ind_h = doc.add_paragraph(indicator['value']['indicator_name'], style='Heading11')
                        _move_p_after(ind_h, indicator_insertion_point)
                        ind_descrip = doc.add_paragraph(indicator['value']['indicator_description'])
                        _move_p_after(ind_descrip, ind_h)

                        # TODO: change after boilerplate reevaluated
                        # boiler1 = doc.add_paragraph(indicator_boilerplate)
                        # _move_p_after(boiler1, ind_descrip)
                        boiler2 = doc.add_paragraph(indicator_boilerplate2)
                        # _move_p_after(boiler2, boiler1)
                        _move_p_after(boiler2, ind_descrip)

                        section_end = create_table(doc, ecosystem['indicators'][0]['table']['indicator_table'], boiler2)

                        indicator_insertion_point = section_end

                    ecosystem_insertion_point = section_end
                else:
                    temp_text = doc.add_paragraph('(No indicators for this ecosystem.)')
                    _move_p_after(temp_text, eco_h)
                    ecosystem_insertion_point = temp_text

            # Delete the placeholder para
            delete_paragraph(p)

        if '{{PARTNERS}}' in p.text:
            # Remove '{{PARTNERS}}'placeholder and add the report content after empty p.text
            p.text = ''

            # TODO: Find a better way to do this! Paras are appended at end of doc & have to be moved into place
            # Where to insert the next heading
            h_insert_point = p
            p_insert_point = h_insert_point

            for category in context['partners']:
                heading = doc.add_paragraph(context['partner_headers'][category], style='Heading10')
                # Headings are created at the end of the doc and must be moved into place
                _move_p_after(heading, h_insert_point)

                # Where to insert the next partner name
                p_insert_point = heading

                for partner in context['partners'][category]:
                    part = doc.add_paragraph(style='List Bullet')
                    add_hyperlink(part, partner[1], partner[0])
                    # Paragraphs are created at the end of the doc and must be moved into place
                    _move_p_after(part, p_insert_point)
                    p_insert_point = part

                # Next heading created will be moved below the last partner in the preceding list
                h_insert_point = part

            # Counties
            if 'counties' in context:
                county_header = doc.add_paragraph('Land Trusts (by county)', style='Heading10')
                c_insert_point = p_insert_point
                _move_p_after(county_header, c_insert_point)
                c_insert_point = county_header
                for county in context['counties']:
                    county_name = doc.add_paragraph(style='List Bullet')
                    add_hyperlink(county_name, county['url'], county['name'])
                    _move_p_after(county_name, c_insert_point)
                    # Change insertion point so next county follows this one
                    c_insert_point = county_name

            # Delete the placeholder para
            delete_paragraph(p)

    report = doc.save(path)

    return report


def generate_report_context(unit_id, config):
    """
        Create json of data points required for report

    Parameters
    ----------
    unit_id: string id of a summary unit
    config: dict of json data from src/config

    Returns
    -------
    context: dict of data in report structure

    """

    with open(os.path.join(DATA_DIR, '{0}.json'.format(unit_id))) as json_file:
        data = json.loads(json_file.read())

    total_acres = data['acres']

    context = dict()

    context['value'] = {'summary_unit_name': data['name']}
    context['table'] = {}

    # Priorities table

    priorities = dict(col_names=['Priority Category', 'Acres', 'Percent of Area'])

    priorities['rows'] = [
        (config['priorities'][str(i)]['label'], percent_to_acres(percentage, total_acres), str(percentage) + '%')
        for i, percentage in enumerate(data.get('blueprint'))
    ]
    priorities['rows'].reverse()

    context['table']['priorities'] = priorities

    # Ecosystem table

    ecosystems_table = dict(col_names=['Ecosystems', 'Acres', 'Percent of Area'])

    ecosystems = data.get('ecosystems', [])  # make sure we always have a list

    ecosystems_with_area = [(e, ecosystems[e]['percent']) for e in ecosystems if 'percent' in ecosystems[e]]
    # filter the list to those with percents, and make a new list of tuples of ecosystem ID and percent
    ecosystems_with_area = sorted(ecosystems_with_area, key=lambda x: x[1],
                                  reverse=True)  # sort by percent, from largest percent to smallest

    ecosystems_table['rows'] = [
        (config['ecosystems'][e]['label'], percent_to_acres(percent, total_acres), str(percent) + '%')
        for e, percent in ecosystems_with_area
    ]

    context['table']['ecosystems'] = ecosystems_table

    # Indicators

    context['ecosystem_indicators'] = []

    ecosystems_ind = [(key, data['ecosystems'][key].get('percent', None)) for key in data['ecosystems']]

    ecosystems_with_percent = [e for e in ecosystems_ind if e[1] is not None]
    ecosystems_with_percent = sorted(ecosystems_with_percent, key=lambda x: x[1], reverse=True)  # sort descending percent

    ecosystems_without_percent = [e for e in ecosystems_ind if e[1] is None]
    ecosystems_without_percent = sorted(ecosystems_without_percent, key=lambda x: x[0])  # sort ascending label

    ecosystems = ecosystems_with_percent + ecosystems_without_percent

    for ecosystem in ecosystems:
        key = ecosystem[0]
        ecosystem_data = data['ecosystems'][key]
        ecosystem_config = config['ecosystems'][key]

        ecosystem_indicators = {
            'ecosystem_name': ecosystem_config['label'],
            'indicators': [],
            'ecosystem_percentage': ecosystem_data.get('percent', '')
        }

        # Indicator tables

        for indicator in ecosystem_data.get('indicators', []):
            indicator_config = ecosystem_config['indicators'][indicator]
            indicator_data = ecosystem_data['indicators'][indicator]
            indicator_context = {
                'value': {
                    'indicator_name': indicator_config['label'],
                    'indicator_description': indicator_config['description']
                },
                'table': {
                    'indicator_table': {
                        'col_names': ['Indicator Values', 'Area', 'Percent of Area'],
                        'rows': []
                    }
                }
            }

            indicator_values = list(zip(indicator_config['valueLabels'], indicator_data['percent']))
            indicator_values.reverse()  # Reverse order so highest priorities at top of table
            indicator_context['table']['indicator_table']['rows'] = [
                (indicator_config['valueLabels'][label], percent_to_acres(percent, total_acres), str(percent) + '%')
                for label, percent in indicator_values
            ]

            ecosystem_indicators['indicators'].append(indicator_context)

        context['ecosystem_indicators'].append(ecosystem_indicators)

    # Partners list - name and url separated by categories

    context['partner_headers'] = {
        'regional': 'Regional Conservation Plans',
        'state': 'Statewide Conservation Plans',
        'marine': 'Marine Conservation Plans'
    }

    context['partners'] = defaultdict(list)
    for plan_key in data['plans']:
        plan = config['plans'][plan_key]
        label = plan['label']
        url = plan.get('url', '')
        context['partners'][plan['type']].append((label, url))

    # Counties list - name and url

    context['counties'] = [
        {'name': value, 'url': 'http://findalandtrust.org/counties/{0}'.format(key)}
        for key, value in data['counties'].items()
    ]  # key is FIPS and value is county with state

    # Ownership table

    if 'owner' in data:
        owners = dict(col_names=['Ownership', 'Acres', 'Percent of Area'])

        owners['rows'] = [
            [config['owners'][key]['label'], percent_to_acres(percent, total_acres), str(percent) + '%']
            for key, percent in data['owner'].items()
        ]

        own_perc_sum = sum(data['owner'].values())

        if own_perc_sum < 100:
            perc_remainder = 100 - own_perc_sum
            owners['rows'].append(['Not conserved', percent_to_acres(perc_remainder, total_acres),
                                   str(perc_remainder) + '%'])

        context['table']['ownership'] = owners
    else:
        context['table']['ownership'] = 'No information available'

    # Protections table

    protection = dict(col_names=['Land Protection Status', 'Acres', 'Percent of Area'])

    if 'gap' in data:
        protection['rows'] = [
            [config['protection'][key]['label'], percent_to_acres(percent, total_acres), str(percent) + '%']
            for key, percent in data['gap'].items()
        ]

        pro_perc_sum = sum(data['gap'].values())

        if pro_perc_sum < 100:
            perc_remainder = 100 - pro_perc_sum
            protection['rows'].append(['Not conserved', percent_to_acres(perc_remainder, total_acres),
                                       str(perc_remainder) + '%'])

        context['table']['protection'] = protection
    else:
        context['table']['protection'] = 'No information available'

    return context


def percent_to_acres(percentage, total_acres):
    return round(total_acres * (percentage / 100))


def create_table(doc, data, para):
    """
    Builds table at end of doc

    Parameters
    ----------
    doc: docx.Document object
    data: dict
        table data; 'data' contains a list of column names ('col_names') and a list of rows ('rows'),
        where each row is a list of values for each column
    para: paragraph object
        Where the table needs to be moved

    Returns
    -------
    end_buffer
        location that the last item was added to the document

    """
    # TODO: ensure tables don't run over a page break

    styles = doc.styles
    ncols = len(data['col_names'])

    # Create table with one row for column headings
    table = doc.add_table(rows=1, cols=ncols)
    table.style = styles[DOC_STYLE]

    for index, heading in enumerate(data['col_names']):
        cell = table.cell(0, index)
        cell.text = heading

    for datarow in data['rows']:
        row = table.add_row()
        for index, datacell in enumerate(datarow):
            row.cells[index].text = str(datacell)

    set_col_widths(table)

    _move_table_after(table, para)

    end_buffer = doc.add_paragraph('')
    _move_p_after_t(table, end_buffer)

    return end_buffer


def set_col_widths(table):
    """
    Set widths for standard table columns

    Parameters
    ----------
    table: table object

    """
    widths = (Cm(9), Cm(4), Cm(4))
    for row in table.rows:
        for idx, width in enumerate(widths):
            row.cells[idx].width = width


def _move_p_after(p_move, p_destination):
    """
    Move one paragraph after another

    Parameters
    ----------
    heading
        heading to be moved
    paragraph
        location where table will be moved

    """
    p_destination._p.addnext(p_move._p)


def _move_table_after(table, paragraph):
    """
    Move the table after 'paragraph.'
    Normally, tables are created at the end of the document.
    This function allows you to move them to a different location in the document.
    The paragraph passed in is not modified, it is just used as a reference point for inserting the table.

    Parameters
    ----------
    table
        table to be moved
    paragraph
        location where table will be moved

    """
    paragraph._p.addnext(table._tbl)


def _move_p_after_t(table, para):
    """
    Move a paragraph after a table

    Parameters
    ----------
    table
        table to be moved
    para: paragraph object
        location where table will be moved

    """
    table._tbl.addnext(para._p)


def add_hyperlink(paragraph, url, text):
    """
    A function that places a hyperlink within a paragraph object.

    Parameters
    ----------
    paragraph: The paragraph we are adding the hyperlink to.
    url: A string containing the required url
    text: The text displayed for the url

    Returns
    -------
    hyperlink: hyperlink object

    """

    # This gets access to the document.xml.rels file and gets a new relation id value
    part = paragraph.part
    r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)

    # Create the w:hyperlink tag and add needed values
    hyperlink = docx.oxml.shared.OxmlElement('w:hyperlink')
    hyperlink.set(docx.oxml.shared.qn('r:id'), r_id, )

    # Create a w:r element
    new_run = docx.oxml.shared.OxmlElement('w:r')

    # Create a new w:rPr element
    rPr = docx.oxml.shared.OxmlElement('w:rPr')

    # Join all the xml elements together add add the required text to the w:r element
    new_run.append(rPr)
    new_run.text = text
    hyperlink.append(new_run)

    paragraph._p.append(hyperlink)

    return hyperlink


def delete_paragraph(paragraph):
    p = paragraph._element
    p.getparent().remove(p)
    p._p = p._element = None


def _resolve(scope, key, context):
    """
    Resolve scope and key to a context item
    Provides very minimal validation of presence

    Parameters
    ----------
    scope: str
        singular variant of scope in context
    key: str
        key to lookup context item in context within scope
    context: dict

    Returns
    -------
    context item: str, dict, etc
    """

    if scope not in context:
        raise ValueError('Scope {0} is not found in context!'.format(scope))

    if key not in context[scope]:
        raise ValueError('Key {0} is not found in context!'.format(key))

    return context[scope][key]


if __name__ == '__main__':
    id = 'I1'
    outpath = '/tmp/{0}.docx'.format(id)
    create_report(id, outpath)
