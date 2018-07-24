import os
import json
import tempfile
from flask import Flask, send_file

from .report import create_report

app = Flask(__name__)

BP_VERSION = '2.2'

CONFIG_DIR = './src/config'
CONFIG = {}
for entry in ('ecosystems', 'owners', 'plans', 'priorities', 'protection'):
    with open('{0}/{1}.json'.format(CONFIG_DIR, entry)) as infile:
        CONFIG[entry] = json.loads(infile.read())


@app.route('/report/<unit_id>', methods=['GET'])
def get_report(unit_id):
    unit_id = unit_id
    doc_name = 'south_atlantic_blueprint_{version}_{id}.docx'.format(
        version=BP_VERSION, id=unit_id)

    with tempfile.TemporaryDirectory() as tmpdir:
        path = os.path.join(tmpdir, doc_name)
        create_report(unit_id, path, CONFIG)

        return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
