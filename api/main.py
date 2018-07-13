import os
import tempfile
from flask import Flask, render_template, request, send_file, redirect

from report import create_report, config_jsons

app = Flask(__name__)
# app = Flask(__name__, static_folder='static')

BP_VERSION = '2.2'


@app.before_first_request
def run_on_start():
    config_jsons()
    return


@app.route('/', methods=['POST'])
def main():

    if request.method == 'POST':
        data_id = request.form['data_id']
        return redirect('report/{0}'.format(data_id))
    else:
        return render_template('index.html', data_id='')


@app.route('/<doc_id>', methods=['GET', 'POST'])
def get_report(doc_id):
    doc_id = doc_id
    doc_name = 'south_atlantic_blueprint_{version}_{id}.docx'.format(version=BP_VERSION, id=doc_id)

    with tempfile.TemporaryDirectory() as tmpdir:
        path = os.path.join(tmpdir, doc_name)
        create_report(doc_id, path)

        return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
