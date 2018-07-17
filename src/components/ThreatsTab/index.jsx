import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LineChart from 'react-svg-line-chart'
import SLR_LEVELS from '../../config/slr.json'
import URBANIZATION_LEVELS from '../../config/urbanization.json'

const ThreatsTab = ({ isMarine, urban, slr }) => {
    if (isMarine) {
        return <div className="text-quieter">No information on threats is available for marine units.</div>
    }
    return (
        <div id="Content" className="flex-container-column">
            <section>
                <h3>Sea level rise</h3>
                {slr !== null && slr.length > 0 ? (
                    <div className="chart-line">
                        <label className="text-quiet text-smaller chart-line-y-axis-label">Percent of watershed</label>
                        <LineChart
                            className="chart-line"
                            areaColor="#004da8"
                            areaVisible
                            gridVisible={false}
                            pathWidth={2}
                            pathColor="#004da8"
                            pointsColor="#004da8"
                            pointsStrokeWidth={0}
                            labelsStepX={1}
                            viewBoxWidth={600}
                            labelsFormatX={x => x || ''}
                            data={slr.map((y, i) => ({ x: SLR_LEVELS[i], y }))}
                        />
                        <div className="text-center text-quiet text-smaller chart-line-x-axis-label">
                            Amount of sea level rise (feet)
                        </div>
                    </div>
                ) : (
                    <parseInt className="text-small text-quieter">
                        This watershed is not impacted by up to 10 feet of projected sea level rise.
                    </parseInt>
                )}
            </section>
            <section>
                <h3>Urban growth</h3>
                {urban !== null && urban.length > 0 ? (
                    <div className="chart-line">
                        <label className="text-quiet text-smaller chart-line-y-axis-label">Percent of watershed</label>
                        <LineChart
                            className="chart-line"
                            areaColor="#D90000"
                            areaVisible
                            gridVisible={false}
                            pathWidth={2}
                            pathColor="#D90000"
                            pointsColor="#D90000"
                            pointsStrokeWidth={0}
                            labelsStepX={10}
                            viewBoxWidth={600}
                            labelsFormatX={x => x || ''}
                            data={urban.map((y, i) => ({ x: URBANIZATION_LEVELS[i], y }))}
                        />
                        <div className="text-center text-quiet text-smaller chart-line-x-axis-label">Decade</div>
                    </div>
                ) : (
                    <p className="text-small text-quieter">
                        This watershed is not impacted by projected urbanization up to 2100.
                    </p>
                )}
            </section>
        </div>
    )
}

ThreatsTab.propTypes = {
    isMarine: PropTypes.bool.isRequired,
    urban: PropTypes.arrayOf(PropTypes.number),
    slr: PropTypes.arrayOf(PropTypes.number)
}

ThreatsTab.defaultProps = {
    urban: null,
    slr: null
}

const mapStateToProps = ({ app }) => {
    const { data, selectedUnit } = app
    const { urban, slr } = data
    return {
        isMarine: !!(selectedUnit && selectedUnit.indexOf('M') === 0),
        urban,
        slr
    }
}

export default connect(mapStateToProps)(ThreatsTab)
