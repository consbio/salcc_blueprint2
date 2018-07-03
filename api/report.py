import re
import os
import json
import docx

from docx import Document
from docx.shared import Cm


# TODO: Improve custom table style in template.docx
DOC_STYLE = 'SALCC_style'

# Example placeholder: {{label:title}}
PLACEHOLDER_REGEX = re.compile(r'{{(?P<scope>\w+):(?P<key>\w+)}}')


def create_report(id, path):
    """
        Creates reports for analyses in docx format.
    """
    doc = Document('template.docx')

    # path = '/root/api/tests/report.docx'

    context = generate_report_context(id)

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

                elif scope == 'table':
                    r.text = ""
                    create_table(doc, item, p)

        if '{{INDICATORS}}' in p.text:
            # Remove '{{INDICATORS}}'placeholder and add the report content above empty p.text
            # Because we're not using replace(match.group()) here, everything must be moved into place
            p.text = ''

            zone_insertion_point = p

            for zone in context['ecosystem_indicators']:
                if 'ecosystem_percentage' in zone:
                    heading = zone['ecosystem_name'] + ': ' + str(zone['ecosystem_percentage']) + "% of area"
                    eco_h = doc.add_paragraph(heading, style='Heading13')
                    _move_p_after(eco_h, zone_insertion_point)
                else:
                    heading = zone['ecosystem_name']
                    eco_h = doc.add_paragraph(heading, style='Heading13')
                    _move_p_after(eco_h, zone_insertion_point)

                indicator_insertion_point = eco_h

                if zone['indicators']:
                    for indicator in zone['indicators']:

                        indicator_boilerplate = 'The average value of the indicator in the {0}, compared to the South ' \
                                                'Atlantic average. The South Atlantic average is the average of ' \
                                                'all HUC12 averages in the South Atlantic region.'.format(
                                                 context['value']['summary_unit_name'])
                        indicator_boilerplate2 = 'The area of {0} values as they occur within the {1} ecosystem in the ' \
                                                 '{2}. Indicator ratings for condition have not yet been set for this ' \
                                                 'indicator.'.format(indicator['value']['indicator_name'],
                                                                     zone['ecosystem_name'],
                                                                     context['value']['summary_unit_name'])

                        ind_h = doc.add_paragraph(indicator['value']['indicator_name'], style='Heading11')
                        _move_p_after(ind_h, indicator_insertion_point)
                        ind_descrip = doc.add_paragraph(indicator['value']['indicator_description'])
                        _move_p_after(ind_descrip, ind_h)

                        boiler1 = doc.add_paragraph(indicator_boilerplate)
                        _move_p_after(boiler1, ind_descrip)
                        boiler2 = doc.add_paragraph(indicator_boilerplate2)
                        _move_p_after(boiler2, boiler1)

                        section_end = create_table(doc, zone['indicators'][0]['table']['indicator_table'], boiler2)

                        indicator_insertion_point = section_end

                    zone_insertion_point = section_end
                else:
                    temp_text = doc.add_paragraph('(No indicators for this ecosystem.)')
                    _move_p_after(temp_text, eco_h)
                    zone_insertion_point = temp_text

            # Delete the placeholder para
            delete_paragraph(p)

        if '{{PARTNERS}}' in p.text:
            # Remove '{{PARTNERS}}'placeholder and add the report content after empty p.text
            p.text = ''

            # TODO: Find a better way to do this! Paras are appended at end of doc & have to be moved into place
            # Where to insert the next heading
            h_insert_point = p

            for category in context['partners']:
                heading = doc.add_paragraph(context['partner_headers'][category], style='Heading10')
                # Headings are created at the end of the doc and must be moved into place
                _move_p_after(heading, h_insert_point)

                # Where to insert the next partner name
                p_insert_point = heading

                for partner in context['partners'][category]:
                    part = doc.add_paragraph(style='List Bullet')
                    # part = doc.add_paragraph(style='BulletHyperlink')
                    add_hyperlink(part, partner[1], partner[0])
                    # Paragraphs are created at the end of the doc and must be moved into place
                    _move_p_after(part, p_insert_point)
                    p_insert_point = part

                # Next heading created will be moved below the last partner in the preceding list
                h_insert_point = part

            # Counties
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

    doc.save(path)


def generate_report_context(id):
    """
        Retrieve data from Analysis and related objects
    """

    with open(os.path.join('../src/config/ecosystems.json')) as e_json_file:
        ecosystems_json = json.loads(e_json_file.read())
    with open(os.path.join('../src/config/owners.json')) as o_json_file:
        owners_json = json.loads(o_json_file.read())
    with open(os.path.join('../src/config/plans.json')) as pl_json_file:
        plans_json = json.loads(pl_json_file.read())
    with open(os.path.join('../src/config/priorities.json')) as pri_json_file:
        priorities_json = json.loads(pri_json_file.read())
    with open(os.path.join('../src/config/protection.json')) as pro_json_file:
        protection_json = json.loads(pro_json_file.read())

    with open(os.path.join('../public/data/{0}.json'.format(id))) as json_file:
        context_json = json.loads(json_file.read())

    acres = context_json['acres']

    context = {}

    context['value'] = {'summary_unit_name': context_json['name']}
    context['table'] = {}

    # Priorities table

    priorities = {
        'col_names': ['Priority Category', 'Acres', 'Percent of Area'],
        'rows': []
    }

    index = 0
    while index < 6:
        # Find acreage
        percentage = context_json['blueprint'][index]
        if percentage is not 0:
            acreage = round(acres * (percentage / 100))
        else:
            acreage = 0

        priority_row = []
        priority_row.append(priorities_json[str(index)]['label'])
        priority_row.append(acreage)
        priority_row.append(percentage)
        # Insert at beginning, because data is stored in reverse order that it must be displayed
        priorities['rows'].insert(0, priority_row)
        index += 1

    context['table']['priorities'] = priorities

    # Ecosystem table

    ecosystems_table = {
        'col_names': ['Ecosystems', 'Acres', 'Percent of Area'],
        'rows': []
    }

    for ecosys in context_json['ecosystems']:
        eco_row = []

        if 'percent' in context_json['ecosystems'][ecosys]:
            percentage = context_json['ecosystems'][ecosys]['percent']
            if percentage > 0:
                acreage = round(acres * (percentage / 100))
            elif percentage is 0:
                acreage = 0
        else:
            percentage = ''
            acreage = ''

        eco_row.append(ecosystems_json[ecosys]['label'])
        eco_row.append(acreage)
        eco_row.append(percentage)
        ecosystems_table['rows'].append(eco_row)

    context['table']['ecosystems'] = ecosystems_table

    # Indicators

    context['ecosystem_indicators'] = []

    for zone in context_json['ecosystems']:

        ecosystem_indicators = {
            'ecosystem_name': ecosystems_json[zone]['label'],
            'indicators': []
        }

        if 'percent' in context_json['ecosystems'][zone]:
            ecosystem_indicators['ecosystem_percentage'] = context_json['ecosystems'][zone]['percent']

        if 'indicators' in context_json['ecosystems'][zone]:
            for indicator in context_json['ecosystems'][zone]['indicators']:
                indicator_data = {
                    'value': {
                        'indicator_name': '',
                        'indicator_description': ''
                    },
                    'table': {
                        'indicator_table': {
                            'col_names': ['Indicator Values', 'Area', 'Percent of Area'],
                            'rows': []
                        }
                    }
                }

                indicator_data['value']['indicator_name'] = ecosystems_json[zone]['indicators'][indicator]['label']
                indicator_data['value']['indicator_description'] = ecosystems_json[zone]['indicators'][indicator]['description']

                index = 0
                if 'indicators' in context_json['ecosystems'][zone]:
                    for val_label in ecosystems_json[zone]['indicators'][indicator]['valueLabels']:
                        table_row = []

                        # Find acreage
                        percentage = context_json['ecosystems'][zone]['indicators'][indicator]['percent'][index]
                        if percentage is not 0:
                            acreage = round(acres * (percentage / 100))
                        else:
                            acreage = 0

                        table_row.append(ecosystems_json[zone]['indicators'][indicator]['valueLabels'][val_label])
                        table_row.append(acreage)
                        table_row.append(percentage)
                        index += 1

                        indicator_data['table']['indicator_table']['rows'].append(table_row)

                ecosystem_indicators['indicators'].append(indicator_data)

        context['ecosystem_indicators'].append(ecosystem_indicators)

    # Partners list - name and url separated by categories

    partners_regional = []
    partners_state = []
    partners_marine = []
    partner_headers = {}

    for plan_key in context_json['plans']:
        plan = plans_json[plan_key]
        if plan['type'] == 'regional':
            partners_regional.append([plan['label'], plan['url']])
            if plan['type'] not in partner_headers:
                partner_headers['regional'] = 'Regional Conservation Plans'
        elif plan['type'] == 'state':
            partners_state.append([plan['label'], plan['url']])
            if plan['type'] not in partner_headers:
                partner_headers['state'] = 'Statewide Conservation Plans'
        elif plan['type'] == 'marine':
            partners_marine.append([plan['label'], plan['url']])
            if plan['type'] not in partner_headers:
                partner_headers['marine'] = 'Marine Conservation Plans'

    context['partner_headers'] = partner_headers

    context['partners'] = {}

    if partners_regional:
        context['partners']['regional'] = partners_regional
    if partners_state:
        context['partners']['state'] = partners_state
    if partners_marine:
        context['partners']['marine'] = partners_marine

    # Counties list - name and url

    counties = []

    for index, (key, value) in enumerate(context_json['counties'].items()):
        # key is FIPS and value is county with state
        county_data = {
            'name': value,
            'url': 'http://findalandtrust.org/counties/{0}'.format(key)
        }
        counties.append(county_data)

    context['counties'] = counties

    # Ownership table

    owners = {
        'col_names': ['Ownership', 'Acres', 'Percent of Area'],
        'rows': []
    }

    own_perc_sum = 0

    for owner_data in context_json['owner']:
        owner_row = []
        for owner_details in owners_json:
            if owner_data == owner_details:

                # Find acreage
                percentage = context_json['owner'][owner_data]
                own_perc_sum += percentage

                if percentage is not 0:
                    acreage = round(acres * (percentage / 100))
                else:
                    acreage = 0

                owner_row.append(owners_json[owner_data]['label'])
                owner_row.append(acreage)
                owner_row.append(percentage)
        owners['rows'].append(owner_row)

    if own_perc_sum < 100:
        perc_remainder = 100 - own_perc_sum
        acreage = round(acres * (perc_remainder / 100))
        remainder_row = ['Not conserved', acreage, perc_remainder]
        owners['rows'].append(remainder_row)

    context['table']['ownership'] = owners

    # Protections table

    protection = {
        'col_names': ['Land Protection Status', 'Acres', 'Percent of Area'],
        'rows': []
    }

    pro_perc_sum = 0

    for pro in context_json['gap']:
        pro_row = []

        # Find acreage
        percentage = context_json['gap'][pro]
        pro_perc_sum += percentage

        if percentage is not 0:
            acreage = round(acres * (percentage / 100))
        else:
            acreage = 0

        pro_row.append(protection_json[pro]['label'])
        pro_row.append(acreage)
        pro_row.append(percentage)

        protection['rows'].append(pro_row)

    if pro_perc_sum < 100:
        perc_remainder = 100 - pro_perc_sum
        acreage = round(acres * (perc_remainder / 100))
        remainder_row = ['Not conserved', acreage, perc_remainder]
        protection['rows'].append(remainder_row)

    context['table']['protection'] = protection

    return context


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
    """
    # TODO: ensure tables don't run over a page break

    styles = doc.styles
    ncols = len(data['col_names'])
    nrows = len(data['rows'])

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
    """
    table._tbl.addnext(para._p)


def add_hyperlink(paragraph, url, text):
    """
    A function that places a hyperlink within a paragraph object.

    :param paragraph: The paragraph we are adding the hyperlink to.
    :param url: A string containing the required url
    :param text: The text displayed for the url
    :return: The hyperlink object
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
    id = 'I2'
    # outpath = '/tmp/{0}.docx'.format(id)
    outpath = 'tests/{0}.docx'.format(id)
    create_report(id, outpath)
