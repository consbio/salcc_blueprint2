import re
import os
import json
import docx

from docx import Document
# from docx.shared import Inches


# TODO: Create custom table style in template.docx
# DOC_STYLE = 'SALCC'

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

                # elif scope == 'image':
                #     # Clear out the placeholder
                #     r.text = r.text.replace(match.group(), '')
                #     r.add_picture()
                #
                # elif scope == 'table':
                #     r.text = ""
                #     create_table(doc, item)

        # if '{{ECOSYSTEMS}}' in p.text:
        #     # Remove '{{ECOSYSTEMS}}'placeholder and add the report content above empty p.text
        #     p.text = ''
        #     # do things
        if '{{PARTNERS}}' in p.text:
            # Remove '{{PARTNERS}}'placeholder and add the report content above empty p.text
            p.text = ''

            # Where to insert the next heading
            h_insert_point = p
            for category in context['partners']:
                heading = doc.add_heading(context['partner_headers'][category], 2)
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
            county_header = doc.add_heading('Land Trusts (by county)', 2)
            c_insert_point = p_insert_point
            _move_p_after(county_header, c_insert_point)
            c_insert_point = county_header
            for county in context['counties']:
                county_name = doc.add_paragraph(style='List Bullet')
                add_hyperlink(county_name, county['url'], county['name'])
                _move_p_after(county_name, c_insert_point)
                c_insert_point = county_name

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

    context = {}

    context['value'] = {'summary_unit_name': context_json['name']}

    # Partner name and url separated by categories

    partner_headers_all = {'regional': 'Regional Conservation Plans', 'state': 'Statewide Conservation Plans',
                           'marine': 'Marine Conservation Plans'}

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

    print('partner_headers: ', partner_headers)

    context['partner_headers'] = partner_headers

    context['partners'] = {}

    if partners_regional:
        context['partners']['regional'] = partners_regional
    if partners_state:
        context['partners']['state'] = partners_state
    if partners_marine:
        context['partners']['marine'] = partners_marine

    print('context partners: ', context['partners'])

    # Counties - name and url

    counties = []

    for index, (key, value) in enumerate(context_json['counties'].items()):
        # key is FIPS and value is county with state
        county_data = {
            'name': value,
            'url': 'http://findalandtrust.org/counties/{0}'.format(key)
        }
        counties.append(county_data)

    context['counties'] = counties

    # # TODO: build tables
    context['table'] = {'priorities': [], 'ecosystems': [], 'ownership': [], 'protection': []}

    # print(context)
    return context


# def create_table(doc, data):
#     """
#     Builds table at end of doc
#
#     Parameters
#     ----------
#     doc: docx.Document object
#     data: dict
#         table data; 'data' contains a list of column names ('col_names') and a list of rows ('rows'),
#         where each row is a list of values for each column
#     """
#
#     styles = doc.styles
#     ncols = len(data['col_names'])
#     # Create table with one row for column headings
#     table = doc.add_table(rows=1, cols=ncols)
#     table.style = styles[DOC_STYLE]
#
#     for index, heading in enumerate(data['col_names']):
#         cell = table.cell(0, index)
#         cell.text = heading
#
#     for datarow in data['rows']:
#         row = table.add_row()
#         for index, datacell in enumerate(datarow):
#             row.cells[index].text = datacell
#
#     # Ensure any following tables are separated from this one by inserting an empty paragraph
#     doc.add_paragraph('')


def _move_p_after(p_move, p_destination):
    """
    Move the table after 'pararaph.'
    Normally, tables are created at the end of the document.
    This function allows you to move them to a different location in the document.
    The paragraph passed in is not modified, it is just used as a reference point for inserting the table.

    Parameters
    ----------
    heading
        heading to be moved
    paragraph
        location where table will be moved

    """
    p_destination._p.addnext(p_move._p)


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
