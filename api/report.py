import re
import os
import json

from docx import Document


# TODO: Create custom table style in template.docx
DOC_STYLE = 'SALCC'

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
        #     p.text = ""
        #     # do things
        # elif '{{PARTNERS}}' in p.text:
        #     # Remove '{{PARTNERS}}'placeholder and add the report content above empty p.text
        #     p.text = ""
        #     # do things

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

    partners = []
    for plan in context_json['plans']:
        partners.append(plans_json[plan])
    # print(partners)

    context['partners'] = partners
    #
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
    # outpath = '/tmp/{0}.docx'.format(id)
    outpath = 'tests/{0}.docx'.format(id)
    create_report(id, outpath)
