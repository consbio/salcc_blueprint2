import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as pl
from io import BytesIO


def get_pie_chart(series, colors, labels):
    """
    Render a pie chart with legend on the right to PNG bytes.

    Parameters
    ----------
    series: list-like of values
    colors: list-like of colors for values
    labels: list-like of labels for values

    Returns
    -------
    BytesIO buffer containing PNG bytes
    """

    pl.figure(figsize=(5, 3))
    pl.gca().axis("equal")
    pie = pl.pie(series, colors=colors, radius=1.2)
    pl.legend(
        pie[0],
        labels,
        loc="center right",
        bbox_to_anchor=(0.95, 0.5),
        bbox_transform=pl.gcf().transFigure,
        frameon=False,
    )
    pl.subplots_adjust(left=-0.1, bottom=0.1, right=0.6)

    buffer = BytesIO()
    pl.savefig(buffer, format="png")
    buffer.seek(0)

    pl.close()

    return buffer


def get_line_chart(
    x_series, y_series, x_label=None, y_label=None, color="blue", alpha=1
):
    """
    Render a line chart to PNG bytes.

    Parameters
    ----------
    x_series: list-like of x values
    y_series: list-like of y values
    x_label: label for x axis (optional, default None)
    y_label: label for y axis (optional, default None)
    color
    alpha

    Returns
    -------
    BytesIO buffer containing PNG bytes
    """

    pl.figure(figsize=(4, 3))
    pl.stackplot(x_series, y_series, color=color, alpha=alpha)
    lines = pl.plot(
        x_series, y_series, linewidth=2, color=color, marker=".", markersize=10
    )
    pl.xlim(min(x_series), max(x_series))
    pl.ylim(min(y_series), max(y_series))

    if x_label:
        pl.xlabel(x_label)
        pl.subplots_adjust(bottom=0.2)

    if y_label:
        pl.ylabel(y_label)

    buffer = BytesIO()
    pl.savefig(buffer, format="png")
    buffer.seek(0)

    pl.close()

    return buffer

