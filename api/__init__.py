import os
import json
import tempfile
from flask import Flask, send_file, abort
from raven.contrib.flask import Sentry

from .report import create_report

SENTRY_DSN = os.getenv("SENTRY_DSN", None)
DATA_DIR = os.getenv("DATA_DIR", "./public/data")

app = Flask(__name__)
sentry = Sentry(
    app, dsn=SENTRY_DSN
)  # automatically loads SENTRY_DSN from env if available


BP_VERSION = "2.2"

CONFIG_DIR = "./src/config"
CONFIG = {}
try:
    for entry in (
        "ecosystems",
        "owners",
        "plans",
        "priorities",
        "protection",
        "slr",
        "urbanization",
    ):
        with open("{0}/{1}.json".format(CONFIG_DIR, entry)) as infile:
            CONFIG[entry] = json.loads(infile.read())
except:
    sentry.captureException()


@app.route("/report/<unit_id>", methods=["GET"])
def get_report(unit_id):
    unit_id = unit_id

    # If we don't have that unit, return a 404
    if not os.path.exists(os.path.join(DATA_DIR, "{0}.json".format(unit_id))):
        abort(404)

    doc_name = "south_atlantic_blueprint_{version}_{id}.docx".format(
        version=BP_VERSION, id=unit_id
    )

    with tempfile.TemporaryDirectory() as tmpdir:
        path = os.path.join(tmpdir, doc_name)
        create_report(unit_id, path, CONFIG)

        return send_file(path, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
