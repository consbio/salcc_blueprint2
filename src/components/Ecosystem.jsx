import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {range} from 'd3-array';
import {formatPercent} from '../utils';
import Indicator from './Indicator';
import IndicatorDetails from './IndicatorDetails';


// Ecosystem globals live here
const ECOSYSTEMS = {
    'BeachAndDune': {
        label: 'Beach and dune',
        color: '#e7cb94',
        indicators: {
            BeachBirds: {
                label: 'Beach birds',
                description: "Beach birds is an index of habitat suitability for four shorebird species (Wilson's plover, American oystercatcher, least tern, piping plover). The relative use of beach habitat by these species for nesting, foraging, and breeding is an indicator of beach quality.",
                valueLabels: {
                    1: 'Below the 20th percentile of importance for bird index species',
                    2: '20th - 40th percentile of importance',
                    3: '40th - 60th percentile of importance',
                    4: '60th - 80th percentile of importance',
                    5: 'Above the 80th percentile of importance for bird index species (American oystercatcher, Wilsonâ€™s plover, least tern, and piping plover)'
                },
                categoricalValues: range(1, 6),
                categories: {
                    1: '<20',
                    2: '20-40',
                    3: '40-60',
                    4: '60-80',
                    5: '>80'
                },
                domain: [10, 100],
                datasetID: '59a112afa51e4739be6c984c0fefb02d',
                goodConditionThreshold: 60 // Placeholder
            },
            UnalteredBeach: {
                label: 'Unaltered beach',
                description: 'Unaltered beach is an index of impacts from hardened structures like jetties, groins, and human infrastructure. Shoreline infrastructure degrades beach habitat, impedes beach migration and barrier island rollover processes, and can cause erosion.',
                valueLabels: {
                    0: 'Vulnerable to alteration, with/without nearby jetties/groins (low)',
                    1: 'Less vulnerable with nearby jetties/groins',
                    2: 'Less vulnerable without nearby jetties/groins (high)'
                },
                categoricalValues: range(0, 3),
                domain: [0, 2],
                datasetID: 'c58be422af514fbd906c93f8579efe01',
                goodConditionThreshold: 2 // Placeholder
            }
        }
    },
    'Estuarine': {
        label: 'Estuarine',
        color: '#9edae5',
        indicators: {
            CoastalCondition: {
                label: 'Coastal condition',
                description: 'Coastal condition is a continuous index of water quality, sediment quality, and benthic community condition that reflects the overall abiotic status of open water estuaries and estuarine marsh. Developed by the Environmental Protection Agency (EPA), these measures capture human impacts on the environment like nonpoint source pollution.',
                valueLabels: {
                    1: 'Poor',
                    2: 'Fair to poor',
                    3: 'Fair',
                    4: 'Good to fair',
                    5: 'Good condition for index (water quality, sediment quality, and benthic community condition)'
                },
                categoricalValues: range(1, 6),
                categories: {
                    1: '<2',
                    2: '2.0-2.4',
                    3: '2.4-3.7',
                    4: '3.7-4.0',
                    5: '>4.0'
                },
                domain: [1, 5],  //TODO: should this be 1.13 instead?
                datasetID: 'a2fddbed78a64e73bbb5ed99b114f5f7',
                goodConditionThreshold: 4 // Placeholder
            },
            WaterVegetationEdge: {
                label: 'Water - vegetation edge (km/sq km)',
                description: 'Water-vegetation edge is an index of edge length between open water and vegetation where estuarine waters meet wetland marshes. This zone is highly productive for shrimp, crab, fish, and other nekton and provides valuable foraging habitat for marsh birds. ',
                valueLabels: {
                    0: '0 - 0.61 km/sq km', // (km/sq km)
                    1: '0.61 - 1.68 km/sq km',
                    2: '1.68 - 2.82 km/sq km',
                    3: '2.82 - 4.27 km/sq km',
                    4: '4.27 - 19.42 km/sq km'
                },
                categoricalValues: range(0, 5),
                domain: [0, 4],
                datasetID: '00ecbf6049d4481db1f1416e4e3b8cc2',
                goodConditionThreshold: 3 // Placeholder
            },
            WetlandPatchSize: {
                label: 'Wetland patch size (hectares)',
                description: 'Wetland patch size is an index based on the size of wetland patches. Larger, better connected wetland patches benefit fish and marsh birds and protect inland areas from waves during storm events.',
                valueLabels: {
                    0: '1 - 328 ha', // (hectares)
                    1: '329 - 1,228 ha',
                    2: '1,229 - 3,087 ha',
                    3: '3,088 - 6,088 ha',
                    4: '6,088 - 15,154 ha'
                },
                categoricalValues: range(0, 5),
                domain: [0, 4],
                datasetID: '8f008af46e2b4cfb877a84e86bd930c9'
            }
        }
    },
    'ForestedWetland': {
        label: 'Forested wetland',
        color: '#cedb9c',
        indicators: {
            Amphibians: {
                label: 'Forested wetland amphibians',
                description: 'Forested wetland amphibians draws from the Priority Amphibian and Reptile Conservation Areas (PARCAs) located in forested wetland habitat. PARCA is an expert-driven, nonregulatory designation that captures places capable of supporting viable amphibian and reptile populations. PARCAs include areas where rare or at-risk species have been observed or are likely to occur (like embedded, isolated wetlands).',
                valueLabels: {
                    0: 'Not a Priority Amphibian and Reptile Conservation Area (PARCA) within forested wetlands',
                    1: 'Priority Amphibian and Reptile Conservation Area (PARCA) within forested wetlands'
                },
                categoricalValues: range(0, 2),
                domain: [0, 1],
                datasetID: '7971445641934255b319b5971600eb47'
            },
            Birds: {
                label: 'Forested wetland birds',
                description: "Forested wetland birds is an index of habitat suitability for six bird species (Northern parula, black-throated green warbler, red-headed woodpecker, Chuck-will's widow, prothonotary warbler, Swainson's warbler) based on patch size and proximity to water. The needs of these species are increasingly restrictive at higher index values, reflecting better quality habitat.",
                valueLabels: {
                    0: 'Less potential for presence of bird index species',
                    1: "Potential for presence of Northern parula,black-throated green warbler,red-headed woodpecker, or Chuck-will's widow",
                    2: 'Potential for additional presence of prothonotary warbler',
                    3: "Potential for additional presence of Swainson's warbler"
                },
                categoricalValues: range(0, 4),
                domain: [0, 3],
                datasetID: 'ecf2d74a50cc47fa99ae6ef42d838866',
                goodConditionThreshold: 2 // Placeholder
            }
        }
    },
    'FreshwaterMarsh': {
        label: 'Freshwater marsh',
        color: '#9c9ede',
        indicators: {
            Birds: {
                label: 'Freshwater marsh birds',
                description: 'Freshwater marsh birds is a continuous index of patch size. Larger patches are likely to support the following suite of freshwater marsh birds: least bittern, Northern pintail, Northern shoveler, and king rail.',
                valueLabels: {
                    1: 'Less potential for presence of bird index species',
                    2: 'Potential for presence of least bittern, Northern pintail, and Northern shoveler',
                    3: 'Potential for additional presence of king rail'
                },
                categoricalValues: range(1, 4),
                categories: {
                    1: 'Less than 5 ha',
                    2: '5 to 20 ha',
                    3: 'Greater than 20 ha'
                },
                domain: [0, 11907],
                units: 'ha',
                datasetID: '785b6209bae6492ba080df35c40cc5ba'
            }
        }
    },
    'MaritimeForest': {
        label: 'Maritime forest',
        color: '#8ca252',
        indicators: {}  // Currently has no indicators
    },
    'PineAndPrairie': {
        label: 'Pine and prairie',
        color: '#bd9e39',
        indicators: {
            Amphibians: {
                label: 'Pine and prairie amphibians',
                description: 'Pine and prairie amphibians draws from the Priority Amphibian and Reptile Conservation Areas (PARCAs) located in pine and prairie habitat. PARCA is an expert-driven, nonregulatory designation that captures places capable of supporting viable amphibian and reptile populations. PARCAs include areas where rare or at-risk species have been observed or are likely to occur (like embedded, isolated wetlands).',
                valueLabels: {
                    0: 'Not a Priority Amphibian and Reptile Conservation Area (PARCA) within pine and prairie',
                    1: 'Priority Amphibian and Reptile Conservation Area (PARCA) within pine and prairie'
                },
                categoricalValues: range(0, 2),
                domain: [0, 1],
                datasetID: '89c74fcd28b14683ae2322211104e56c'
            },
            Birds: {
                label: 'Pine and prairie birds',
                description: "Pine and prairie birds is an index of habitat suitability for three bird species (Northern bobwhite, red-cockaded woodpecker, Bachman's sparrow) based on observational data and predictive models. The presence of all three species indicates high pine ecosystem quality.",
                valueLabels: {
                    0: 'Less potential for presence of bird index species',
                    1: 'Potential for presence of 1 bird index species',
                    2: 'Potential for presence of 2 bird index species',
                    3: "Potential for presence of all 3 bird index species (Bachman's sparrow, bobwhite quail, and red-cockaded woodpecker)"
                },
                categoricalValues: range(0, 4),
                domain: [0, 3],
                datasetID: '68f3ce917278453a82afcd280b5ec84b'
            },
            RegularlyBurnedHabitat: {
                label: 'Regularly burned habitat',
                description: 'Regularly burned habitat is an an indicator of acres of fire-maintained, open canopy habitat. It attempts to capture recent fire in the pine ecosystem by using LANDFIRE data (1999-2010) as a proxy for regularly burned habitat.',
                valueLabels: {
                    0: 'Not recently burned or not open canopy',
                    1: 'Recently burned and open canopy'
                },
                categoricalValues: range(0, 2),
                domain: [0, 1],
                datasetID: 'ea13b5d4f83d4e27bc8bfc8878a85b2c'
            }
        }
    },
    'UplandHardwood': {
        label: 'Upland hardwood',
        color: '#637939',
        indicators: {
            Birds: {
                label: 'Upland hardwood birds',
                description: "Upland hardwood birds is an index of habitat suitability for seven upland hardwood bird species (wood thrush, whip-poor-will, hooded warbler, American woodcock, Acadian flycatcher, Kentucky warbler, Swainson's warbler) based on patch size and other ecosystem characteristics such as proximity to water and proximity to forest and ecotone edge. The needs of these species are increasingly restrictive at higher index values, reflecting better quality habitat.",
                valueLabels: {
                    0: 'Less potential for presence of bird index species',
                    1: 'Potential for presence of wood thrush or whip-poor-will',
                    2: 'Potential for additional presence of hooded warbler or American woodcock',
                    3: 'Potential for additional presence of Acadian flycatcher or Kentucky warbler',
                    4: "Potential for additional presence of Swainson's warbler"
                },
                categoricalValues: range(0, 5),
                domain: [0, 4],
                datasetID: '9a98b3bf45fc4d2aa0833a171b56533a'
            },
            UrbanOpenSpace: {
                label: 'Urban open space',
                description: 'Urban open space is an index based on distance of urban areas from open space. This cultural resource indicator is intended to capture equitable access to open space for urban residents. Protected natural areas in urban environments offer refugia for some species while providing people a nearby place to connect with nature.',
                valueLabels: {
                    0: 'Existing development',
                    1: 'Undeveloped area less than 400 m from protected land',
                    2: 'Undeveloped area 400 - 800 m from protected land',
                    3: 'Undeveloped area 800 - 1600 m from protected land',
                    4: 'Undeveloped area greater than 1600 m from protected land',
                    5: 'Protected land'
                },
                categoricalValues: range(0, 6),
                domain: [0, 5],
                datasetID: 'c0039f1c66c14115ba8b5f51ee22ef97'
            }
        }
    },
    'Marine': {
        label: 'Marine',
        color: '#1f77b4',
        indicators: {
            Mammals: {
                label: 'Marine mammals',
                description: 'Marine mammals is a continuous index of dolphin and whale density based on monthly density predictions for ten species of cetaceans and yearly density predictions for three rarer cetacean species. Marine mammals help identify key areas of ocean productivity and overall ocean health because they have long life spans, feed at high trophic levels, and can accumulate anthropogenic chemicals and toxins in their large blubber stores.',
                valueLabels: {
                    1: 'Below the 20th percentile of importance for seasonal density of marine mammal index species',
                    2: '20th - 40th percentile of importance',
                    3: '40th - 60th percentile of importance',
                    4: '60th - 80th percentile of importance',
                    5: 'Above the 80th percentile of importance for seasonal density of marine mammal index species'
                },
                categoricalValues: range(1, 6),
                categories: {
                    1: '<20',
                    2: '20-40',
                    3: '40-60',
                    4: '60-80',
                    5: '>80'
                },
                domain: [0, 100],
                datasetID: 'be70e3438a6e48d798916e788f35ef6b'
            },
            PotentialHardbottomCondition: {
                label: 'Potential hardbottom condition',
                description: 'Potential hardbottom condition measures the protected status or potential stress (i.e., shipping traffic, dredge disposal) of solid substrate and rocky outcroppings. Hardbottom provides an anchor for important seafloor habitat such as deepwater corals, plants, and sponges, supporting associated invertebrate and fish species.',
                valueLabels: {
                    0: 'Hardbottom not predicted',
                    1: 'Hardbottom likely to be stressed by human activities',
                    2: 'Hardbottom less likely to be stressed by human activities',
                    3: 'Hardbottom likely to be in best condition due to additional protections'
                },
                categoricalValues: range(0, 4),
                domain: [0, 3],
                datasetID: 'cbb923b746fc435b93d079f9261fa7c2'
            }
        }
    },

    // universal(cross-system) ecosystems, these will not have a percent
    'FreshwaterAquatic': {
        label: 'Freshwater aquatic',
        color: '#1f77b4',
        isUniversal: true,
        indicators: {
            PermeableSurface: {
                label: 'Permeable surface',
                description: 'Permeable surface is a continuous indicator that measures the percent of non-impervious cover by catchment. High levels of impervious surface degrade water quality and alter freshwater flow.',
                valueLabels: {
                    1: 'Less than 70% of catchment permeable, likely degraded instream flow, water quality, and aquatic species communities',
                    2: '70 - 90% of catchment permeable, likely degraded water quality and not supporting many aquatic species',
                    3: '90 - 95% of catchment permeable, likely declining water quality and supporting most aquatic species',
                    4: 'Greater than 95% of catchment permeable, likely high water quality and supporting most sensitive aquatic species'
                },
                //categoricalValues: d3.range(1, 5),
                categories: {
                    1: '<70%',
                    2: '70-90%',
                    3: '90-95%',
                    4: '>95%'
                },
                domain: [9, 100],
                datasetID: 'aff20e09ff62451685dfb8ffedceeec1'
            },
            RiparianBuffers: {
                label: 'Riparian buffers',
                description: 'Riparian buffers measures the amount of natural habitat surrounding rivers and streams. This continuous indicator applies to the Active River Area, which spatially defines the dynamic relationship between riverine systems and the lands around them. The Active River Area includes meander belts, riparian wetlands, floodplains, terraces, and material contribution areas. Riparian buffers are strongly linked to water quality as well as water availability (i.e., instream flow).',
                valueLabels: {
                    1: 'Less than 80% natural habitat surrounding rivers and streams',
                    2: '80 - 85% natural cover',
                    3: '85 - 90% natural cover',
                    4: '90 - 95% natural cover',
                    5: 'Greater than 95% natural habitat surrounding rivers and streams'
                },
                categoricalValues: range(1, 6),
                categories: {
                    1: 'Less than 80%',
                    2: '80 - 85%',
                    3: '85 - 90%',
                    4: '90 - 95%',
                    5: 'Greater than 95%'
                },
                domain: [0, 100],
                datasetID: 'c822c798ba724e06b5fb25d2c18ff0cb'
            },
            ImperiledAquaticSpecies: {
                label: 'Imperiled aquatic species',
                description: "Imperiled aquatic species measures the number of aquatic species within each watershed that are listed as G1 (globally critically imperiled), G2 (globally imperiled), or threatened/endangered under the U.S. Endangered Species Act. This indicator captures patterns of rare and endemic species diversity not well-represented by other freshwater aquatic indicators. It applies only to the Active River Area, which spatially defines the dynamic relationship between riverine systems and the lands around them; it includes meander belts, riparian wetlands, floodplains, terraces, and material contribution areas.",
                valueLabels: {
                    0: 'No aquatic imperiled (G1/G2) or threatened/endangered species observed',
                    1: '1 aquatic imperiled (G1/G2) or threatened/endangered species observed',
                    2: '2 aquatic imperiled (G1/G2) or threatened/endangered species observed',
                    3: '3 aquatic imperiled (G1/G2) or threatened/endangered species observed',
                    4: '4 or more aquatic imperiled (G1/G2) or threatened/endangered species observed'
                },
                categoricalValues: range(0, 5),
                domain: [0, 4],
                datasetID: 'f6aa9bc688814468b5ae2772375c9fc2'
            }
        }
    },
    'Landscapes': {
        label: 'Landscapes',
        color: '#c7e9c0',
        isUniversal: true,
        indicators: {
            LowRoadDensityPatches: {
                label: 'Low road density',
                description: 'Low road density is an index of areas with few roads, measuring the length of roads within a square kilometer area. It represents habitat fragmentation. Extensive road networks are harmful to many species, including reptiles and amphibians, birds, and large mammals.',
                valueLabels: {
                    0: 'High road density (\u22651.5 km/sq km)',
                    1: 'Low road density (<1.5 km/sq km) '
                },
                categoricalValues: range(0, 2),
                domain: [0, 1],
                datasetID: '61856f9901d74185a34c08e857380395'
            },
            LowUrbanHistoric: {
                label: 'Low-urban historic landscapes',
                description: 'Low-urban historic landscapes is an index of sites on the National Register of Historic Places surrounded by limited urban development. This cultural resource indicator identifies significant historic places that remain connected to their context in the natural world.',
                valueLabels: {
                    0: 'Not in the National Register of Historic Places',
                    1: 'Historic place with nearby high-urban buffer',
                    2: 'Historic place with nearby low-urban buffer'
                },
                categoricalValues: range(0, 3),
                domain: [0, 2],
                datasetID: '037ecaa254ff48f88969fc1db467d917'
            },
            ResilientBiodiversityHotspots: {
                label: 'Resilient biodiversity hotspots',
                description: 'Resilient biodiversity hotspots is an index of mostly natural high-diversity areas potentially resilient to climate change. This indicator measures landscape diversity (geophysical features like soil and topography) and local connectedness. Areas with these characteristics will likely continue to support species richness and movement in a changing climate (i.e., are resilient).',
                valueLabels: {
                    0: 'Urban',
                    1: 'Final resilience score: Far below average (<-2 SD)',
                    2: 'Final resilience score: Below average (-1 to -2 SD)',
                    3: 'Final resilience score: Slightly below average (-0.5 to -1 SD)',
                    4: 'Final resilience score: Average (0.5 to -0.5 SD)',
                    5: 'Final resilience score: Slightly above average (0.5 to 1 SD)',
                    6: 'Final resilience score: Above average (1 to 2 SD)',
                    7: 'Final resilience score: Far above average (>2 SD)'
                },
                categoricalValues: range(0, 8),
                domain: [0, 7],
                datasetID: '72cd46173b7b4801bfa88458b29d0d9b'
            }
        }
    },
    'Waterscapes': {
        label: 'Waterscapes',
        color: '#c6dbef',
        isUniversal: true,
        indicators: {
            MigratoryFishConnectivity: {
                label: 'Migratory fish connectivity',
                description: 'Migratory fish connectivity is an index capturing how far upstream migratory fish have been observed. It also includes adjacent areas where habitat access could be restored through fish passage and hydrological barrier removal efforts. Migratory fish presence reflects uninterrupted connections between freshwater, estuarine, and marine ecosystems.',
                valueLabels: {
                    1: 'Migratory fish connectivity index species not adjacent/not observed',
                    2: 'Adjacent to presence of migratory fish connectivity index species',
                    3: 'Presence of Alabama shad, American shad, blueback herring, or striped bass',
                    4: 'Presence of Gulf or Atlantic sturgeon'
                },
                categoricalValues: range(1, 5),
                domain: [1, 4],
                datasetID: '955b5af8b2e24648a11b4a0134c0b285'
            },
            NetworkComplexity: {
                label: 'Network complexity',
                description: 'Network complexity depicts the number of different stream size classes in a river network not separated by large dams. River networks with a variety of connected stream classes help retain aquatic biodiversity in a changing climate by allowing species to access climate refugia and move between habitats.',
                valueLabels: {
                    1: '1 connected stream size class',
                    2: '2 connected stream size classes',
                    3: '3 connected stream size classes ',
                    4: '4 connected stream size classes ',
                    5: '5 connected stream size classes',
                    6: '6 connected stream size classes',
                    7: '7 connected stream size classes'
                },
                categoricalValues: range(1, 8),
                domain: [1, 7],
                datasetID: '88e4e923d1e94e1d833f0cfd5bb93d5e'
            }
        }
    }
};


class Ecosystem extends Component {
    constructor(props) {
        super(props);
    }

    handleIndicatorSelect = (indicator) => {
        this.props.onSetIndicator(this.props.ecosystem, indicator);
    }

    handleIndicatorDeselect = () => {
        this.props.onSetIndicator(null, null);
    }

    renderHeader(icon, label, percent) {
        return (
            <div className="ecosystem-header flex-container flex-justify-start flex-align-center">
                <img src={icon} alt=""/>
                <h3>{label}</h3>
                {percent &&
                    <div className="text-quieter text-right text-small">
                        {formatPercent(percent)}%
                        <br/>
                        <span className="text-smaller">of area</span>
                    </div>
                }
            </div>
        );
    }

    renderIndicators(indicators) {
        if (indicators.length === 0) return <div className="no-indicators">Ecosystem does not have any indicators</div>;

        return indicators.map((indicator) =>
            <Indicator key={indicator.id}
                       {...indicator}
                       onClick={()=>this.handleIndicatorSelect(indicator)} />
        );
    }

    render() {
        const {ecosystem, icon, selectedIndicator} = this.props;
        const ecosystemConfig = ECOSYSTEMS[ecosystem];
        const {label} = ecosystemConfig;

        if (selectedIndicator !== null) {
            return (
                <IndicatorDetails ecosystemLabel={label}
                                  ecosystemIcon={icon}
                                  {...selectedIndicator}
                                  onClick={this.handleIndicatorDeselect} />
            );
        }

        const {percent, indicators} = this.props;
        const indicatorsConfig = ecosystemConfig.indicators;
        let indicatorKeys = Object.keys(indicators || {});  // some ecosystems are present but don't have indicators
        indicatorKeys.sort();

        // Merge constants with dynamic data
        const mergedIndicators = indicatorKeys.map((indicator) => {
            return Object.assign(
                {id: indicator},
                indicatorsConfig[indicator],
                indicators[indicator]
            );
        });

        return (
            <div className="ecosystem">
                { this.renderHeader(icon, label, percent) }

                { this.renderIndicators(mergedIndicators) }

            </div>
        );
    }
}

Ecosystem.propTypes = {};
Ecosystem.defaultProps = {
    selectedIndicator: null,
    onSetIndicator: function() {}
};

export default Ecosystem;
