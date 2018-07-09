from flask import Flask, render_template, request, send_file, send_from_directory

from report import create_report

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html', data_id='')


@app.route('/', methods=['POST'])
def get_report():
    data_id = request.form['data_id']
    path = 'tests/{0}.docx'.format(data_id)
    doc_name = '{0}.docx'.format(data_id)

    report = create_report(data_id, path)

    return send_from_directory('tests', doc_name, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
