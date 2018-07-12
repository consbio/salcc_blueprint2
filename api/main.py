import os
from flask import Flask, render_template, request, send_from_directory, redirect

from report import create_report

app = Flask(__name__)
# app = Flask(__name__, static_folder='static')

BP_VERSION = '2.2'


@app.route('/', methods=['POST'])
def main():

    if request.method == 'POST':
        data_id = request.form['data_id']
        return redirect('report/{0}.docx'.format(data_id))
    else:
        return render_template('index.html', data_id='')


@app.route('/<doc_id>', methods=['GET', 'POST'])
def get_report(doc_id):
    doc_id = doc_id
    doc_name = 'south_atlantic_blueprint_{version}_{id}'.format(version=BP_VERSION, id=doc_id)
    path = 'tests/{0}.docx'.format(doc_name)

    create_report(doc_id, path)

    try:
        return send_from_directory('tests', doc_name, as_attachment=True)
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run(debug=True)
