//From version 1
//var blueprintCategories = {
//    0: 'Not Prioritized',
//    1: 'Highest Priority',
//    2: 'High Priority',
//    3: 'Low Priority',
//    4: 'Further Investigation'
//};
//var colors = {
//    'Highest Priority': "#8400a8",
//    'High Priority': "#0070ff",
//    'Further Investigation': "#f59090",
//    'Low Priority': "#f7d6c3",
//    'Not Prioritized': '#AAAAAA'
//};
import {range} from 'd3-array';
import {scale, keys} from 'd3';

var noInfoMessage = '<div class="quiet" style="margin-bottom: 10px;">No information available</div>';


//Version 2.1
const blueprintCategories = {
    0: 'Not priority',
    1: 'Corridors',
    2: 'Medium priority',
    3: 'High priority',
    4: 'Highest priority'
};
//const blueprintCategoriesArray = d3.values(blueprintCategories);

const colors = [
    '#D3D3D3',
    '#686868',
    '#fbb4b9',
    '#c51b8a',
    '#49006a'
]
export default colors;
//var colorsArray = d3.values(colors);

var ecosystemLabels = {
    'beach_and_dune': 'Beach and dune',
    'estuaries': 'Estuarine',
    'forested_wetland': 'Forested wetland',
    'freshwater_marsh': 'Freshwater marsh',
    'maritime_forest': 'Maritime forest',
    'pine_and_prairie': 'Pine and prairie',
    'upland_hardwood': 'Upland hardwood',
    'marine': 'Marine'
};
//var ecosystems = d3.keys(ecosystemLabels);

//add universal ecosystems
ecosystemLabels['FreshwaterAquatic'] = 'Freshwater aquatic';
ecosystemLabels['Landscapes'] = 'Landscapes';
ecosystemLabels['Waterscapes'] = 'Waterscapes';

//var universalEcosystems = d3.set(['FreshwaterAquatic', 'Landscapes', 'Waterscapes']);

var ecosystemColors = {
    'beach_and_dune': '#e7cb94',
    'estuaries': '#9edae5',
    'forested_wetland': '#cedb9c',
    'freshwater_marsh': '#9c9ede',
    'maritime_forest': '#8ca252',
    'pine_and_prairie': '#bd9e39',
    'upland_hardwood': '#637939',
    'marine': '#1f77b4',

    //TODO: may need better colors
    'FreshwaterAquatic': '#1f77b4',
    'Landscapes': '#c7e9c0',
    'Waterscapes': '#c6dbef' // TODO: confirm
};

function ecosystemKey(name) {
    return 'pct_' + name.replace(/ /g, '_');
}

// Each plan is name|description
var plans = {
    'Regional Conservation Plans': {
        'ACJV': 'ACJV migratory bird priority areas|Atlantic Coast Joint Venture (ACJV)/ South Atlantic Migratory Bird Initiative (SAMBI) Priority Areas',
        'EPA': 'EPA priority watersheds|Environmental Protection Agency (EPA) Region 4 Priority Watersheds (except Virginia)',
        'PARCA': 'Amphibian and reptile conservation|Partners in Amphibian & Reptile Conservation (PARC) Priority Areas',
        'NBCI': 'Bobwhite conservation areas|National Bobwhite Conservation Initiative (NBCI) Plan',
        'TNC': "TNC's conservation priorities|The Nature Conservancy's (TNC) Ecoregional Priorities for the Mid-Atlantic Coastal Plain, South Atlantic Coastal Plain, and Piedmont"
    },
    'Statewide Conservation Plans': {
        'Alabama': 'AL Strategic Habitat Units|Alabama Strategic Habitat Units',
        'Florida': 'FL Critical Lands &amp; Waters|Florida Critical Lands and Waters (CLIP)',
        'Georgia': 'GA Priority Waters|Georgia Priority Waters',
        'NorthCarolina': 'NC Green Growth Toolbox|Integrated priorities from the NC Green Growth Toolbox',
        'Virginia': 'VA Natural Landscapes Assessment|Virginia Natural Landscapes Assessment'
    },
    'Marine Conservation Plans': {
        'ImportantBirdAreas': 'Important Bird Areas|Important Bird Areas',
        'NC_Capes': 'NC Seashore Viewsheds|5 mile buffer around NC Capes',
        'RightWhale': 'Right Whale Habitat|Right Whale Critical Habitat',
        'SAFMC_HAPC_wDeepwater_Coral': 'Habitat areas of particular concern|All habitat areas of particular concern (HAPC) from the South Atlantic Fisheries Management Council',
        'SnapperHAPC': 'Snapper habitat areas|Snapper habitat areas of particular concern (HAPC) from the South Atlantic Fisheries Management Council',
        'ViewSheds': 'Viewsheds|Buffer around National Seashores'
    }
};

var planURLs = {
    'ACJV': 'http://acjv.org/planning/bird-conservation-regions/sambi/',
    'EPA': 'http://www.epa.gov/region4/water/watersheds/priority.html',
    'PARCA': 'http://www.separc.org/',
    'NBCI': 'http://bringbackbobwhites.org/',
    'TNC': 'http://www.landscope.org/focus/understand/tnc_portfolio/',
    'Alabama': 'http://www.alh2o.org/shus/',
    'Florida': 'http://www.fnai.org/clip.cfm',
    'Georgia': 'http://www.georgiawildlife.com/node/1377',
    'NorthCarolina': 'http://www.ncwildlife.org/Conserving/Programs/GreenGrowthToolbox.aspx',
    'Virginia': 'http://www.dcr.virginia.gov/natural_heritage/vaconvisvnla.shtml',
    'SnapperHAPC': 'http://safmc.net/  ',
    'SAFMC_HAPC_wDeepwater_Coral': 'http://safmc.net/',
    'RightWhale': 'http://www.nmfs.noaa.gov/pr/species/mammals/cetaceans/rightwhale_northatlantic.htm'
};

var ownershipLabels = {
    FED: 'Federal',
    STP: 'State/province',
    LOC: 'Local',
    TNC: 'The Nature Conservancy',
    PNP: 'Private non-profit',
    PFP: 'Private for-profit',
    PLO: 'Private land owner',
    TRB: 'Tribal',
    UNK: 'Ownership unknown'
};

var ownershipColors = {
    FED: '#2ca02c',
    STP: '#1f77b4',
    LOC: '#aec7e8',
    TNC: '#98df8a',
    PNP: '#ad494a',
    PFP: '#ff7f0e',
    PLO: '#d62728',
    TRB: '#9467bd',
    UNK: '#c49c94'
};

var gapLabels = {
    1: 'Permanent protection for biodiversity|e.g., Nature reserves, research natural areas, wilderness areas, Forever Wild easements',
    2: 'Permanent protection to maintain a primarily natural state|e.g., National Wildlife Refuges, many State Parks, high-use National Parks',
    3: 'Permanently secured for multiple uses and in natural cover|e.g., State forests, lands protected from development by forest easements',
    39: 'Permanently secured and in agriculture or maintained grass cover|e.g., Agricultural easements',
    4: 'Unsecured (already developed temporary easements and/or municipal lands)|e.g., Private lands with no easements, city parks, undesignated state lands ',
    9: 'Unknown - protection status unknown|Protection status unknown'
};

var gapColors = {
    1: '#637939',
    2: '#b5cf6b',
    3: '#98df8a',
    39: '#e7cb94',
    4: '#d62728',
    9: '#9edae5'
};

var ecosystemIndicators = {
    'beach_and_dune': ['BeachAndDune_BeachBirds', 'BeachAndDune_UnalteredBeach'],
    'estuaries': ['Estuarine_CoastalCondition', 'EstuarineMarsh_Water_VegetationEdge', 'EstuarineMarsh_WetlandPatchSize'],
    'forested_wetland': ['ForestedWetland_Amphibians', 'ForestedWetland_Birds'],
    'freshwater_marsh': ['FreshwaterMarsh_Birds'],
    'maritime_forest': ['MaritimeForest_MaritimeForestExtent'],
    'pine_and_prairie': ['PineAndPrairie_Amphibians', 'PineAndPrairie_Birds', 'PineAndPrairie_RegularlyBurnedHabitat'],
    'upland_hardwood': ['UplandHardwoods_Birds', 'UplandHardwood_UrbanOpenSpace'],
    'marine': ['Marine_Mammals', 'Marine_PotentialHardbottomCondition'],
    //These are landscape wide, only for inland
    'FreshwaterAquatic': ['FreshwaterAquatic_PermeableSurface', 'FreshwaterAquatic_RiparianBuffers', 'FreshwaterAquatic_ImperiledAquaticSpecies'],
    'Landscapes': ['Landscapes_LowRoadDensityPatches', 'Landscapes_LowUrbanHistoric', 'Landscapes_ResilientBiodiversityHotspots'],
    'Waterscapes': ['Waterscapes_MigratoryFishConnectivity', 'Waterscapes_NetworkComplexity']
};

var indicatorEcosystems = {};
keys(ecosystemIndicators).forEach(function(e){
    ecosystemIndicators[e].forEach(function(d){
        indicatorEcosystems[d] = e;
    });
});


var indicators = {
    BeachAndDune_BeachBirds: {
        label: 'Beach birds',
        description: "Beach birds is an index of habitat suitability for four shorebird species (Wilson's plover, American oystercatcher, least tern, piping plover). The relative use of beach habitat by these species for nesting, foraging, and breeding is an indicator of beach quality.",
        valueLabels: {
            1: 'Below the 20th percentile of importance for bird index species',
            2: '20th-40th percentile of importance',
            3: '40th-60th percentile of importance',
            4: '60th-80th percentile of importance',
            5: 'Above the 80th percentile of importance for bird index species (American oystercatcher, Wilsonâ€™s plover, least tern, and piping plover)'
        },
        //categoricalValues: d3.range(1, 6),
        categories: {
            1: '<20',
            2: '20-40',
            3: '40-60',
            4: '60-80',
            5: '>80'
        },
        absoluteRange: [10, 100],
        id: '59a112afa51e4739be6c984c0fefb02d'
    },
    BeachAndDune_UnalteredBeach: {
        label: 'Unaltered beach',
        description: 'Unaltered beach is an index of impacts from hardened structures like jetties, groins, and human infrastructure. Shoreline infrastructure degrades beach habitat, impedes beach migration and barrier island rollover processes, and can cause erosion.',
        valueLabels: {
            0: 'Vulnerable to alteration, \nwith/without nearby jetties/groins (low)',
            1: 'Less vulnerable with \nnearby jetties/groins',
            2: 'Less vulnerable without \nnearby jetties/groins (high)'
        },
        //categoricalValues: d3.range(0, 3),
        id: 'c58be422af514fbd906c93f8579efe01'
    },
    Estuarine_CoastalCondition: {
        label: 'Coastal condition',
        description: 'Coastal condition is a continuous index of water quality, sediment quality, and benthic community condition that reflects the overall abiotic status of open water estuaries and estuarine marsh. Developed by the Environmental Protection Agency (EPA), these measures capture human impacts on the environment like nonpoint source pollution.',
        valueLabels: {
            1: 'Poor',
            2: 'Fair to poor',
            3: 'Fair',
            4: 'Good to fair',
            5: 'Good condition for index (water quality, sediment quality, and benthic community condition)'
        },
        //categoricalValues: d3.range(1, 6),
        categories: {
            1: '<2',
            2: '2.0-2.4',
            3: '2.4-3.7',
            4: '3.7-4.0',
            5: '>4.0'
        },
        absoluteRange: [1, 5],  //TODO: should this be 1.13 instead?
        id: 'a2fddbed78a64e73bbb5ed99b114f5f7'
    },
    EstuarineMarsh_Water_VegetationEdge: {
        label: 'Water - vegetation edge (km/sq km)',
        description: 'Water-vegetation edge is an index of edge length between open water and vegetation where estuarine waters meet wetland marshes. This zone is highly productive for shrimp, crab, fish, and other nekton and provides valuable foraging habitat for marsh birds. ',
        valueLabels: {
            0: '0-0.61', // (km/sq km)
            1: '0.61-1.68',
            2: '1.68-2.82',
            3: '2.82-4.27',
            4: '4.27-19.42'
        },
        //categoricalValues: d3.range(0, 5),
        id: '00ecbf6049d4481db1f1416e4e3b8cc2'
    },
    EstuarineMarsh_WetlandPatchSize: {
        label: 'Wetland patch size (hectares)',
        description: 'Wetland patch size is an index based on the size of wetland patches. Larger, better connected wetland patches benefit fish and marsh birds and protect inland areas from waves during storm events.',
        valueLabels: {
            0: '1-328 ha', // (hectares)
            1: '329-1,228 ha',
            2: '1,229-3,087 ha',
            3: '3,088-6,088 ha',
            4: '6,088-15,154 ha'
        },
        //categoricalValues: d3.range(0, 5),
        id: '8f008af46e2b4cfb877a84e86bd930c9'
    },
    ForestedWetland_Amphibians: {
        label: 'Forested wetland amphibians',
        description: 'Forested wetland amphibians draws from the Priority Amphibian and Reptile Conservation Areas (PARCAs) located in forested wetland habitat. PARCA is an expert-driven, nonregulatory designation that captures places capable of supporting viable amphibian and reptile populations. PARCAs include areas where rare or at-risk species have been observed or are likely to occur (like embedded, isolated wetlands).',
        valueLabels: {
            0: 'Not a Priority Amphibian and Reptile Conservation Area (PARCA) within forested wetlands',
            1: 'Priority Amphibian and Reptile Conservation Area (PARCA) within forested wetlands'
        },
        //categoricalValues: d3.range(0, 2),
        id: '7971445641934255b319b5971600eb47'
    },
    ForestedWetland_Birds: {
        label: 'Forested wetland birds',
        description: "Forested wetland birds is an index of habitat suitability for six bird species (Northern parula, black-throated green warbler, red-headed woodpecker, Chuck-will's widow, prothonotary warbler, Swainson's warbler) based on patch size and proximity to water. The needs of these species are increasingly restrictive at higher index values, reflecting better quality habitat.",
        valueLabels: {
            0: 'Less potential for presence of bird index species',
            1: "Potential for presence of Northern parula,\nblack-throated green warbler,\nred-headed woodpecker, \nor Chuck-will's widow",
            2: 'Potential for additional presence of \nprothonotary warbler',
            3: "Potential for additional presence of \nSwainson's warbler"
        },
        //categoricalValues: d3.range(0, 4),
        id: 'ecf2d74a50cc47fa99ae6ef42d838866'
    },
    FreshwaterAquatic_PermeableSurface: {
        label: 'Permeable surface',
        description: 'Permeable surface is a continuous indicator that measures the percent of non-impervious cover by catchment. High levels of impervious surface degrade water quality and alter freshwater flow.',
        valueLabels: {
            1: '<70% of catchment permeable, likely degraded instream flow, water quality, and aquatic species communities',
            2: '70-90% of catchment permeable, likely degraded water quality and not supporting many aquatic species',
            3: '90-95% of catchment permeable, likely declining water quality and supporting most aquatic species',
            4: '>95% of catchment permeable, likely high water quality and supporting most sensitive aquatic species'
        },
        //categoricalValues: d3.range(1, 5),
        categories: {
            1: '<70%',
            2: '70-90%',
            3: '90-95%',
            4: '>95%'
        },
        absoluteRange: [9, 100],
        id: 'aff20e09ff62451685dfb8ffedceeec1'
    },
    FreshwaterAquatic_RiparianBuffers: {
        label: 'Riparian buffers',
        description: 'Riparian buffers measures the amount of natural habitat surrounding rivers and streams. This continuous indicator applies to the Active River Area, which spatially defines the dynamic relationship between riverine systems and the lands around them. The Active River Area includes meander belts, riparian wetlands, floodplains, terraces, and material contribution areas. Riparian buffers are strongly linked to water quality as well as water availability (i.e., instream flow).',
        valueLabels: {
            1: '<80% natural habitat surrounding rivers and streams',
            2: '80-85% natural cover',
            3: '85-90% natural cover',
            4: '90-95% natural cover',
            5: '>95% natural habitat surrounding rivers and streams'
        },
        //categoricalValues: d3.range(1, 6),
        categories: {
            1: '<80%',
            2: '80-85%',
            3: '85-90%',
            4: '90-95%',
            5: '>95%'
        },
        absoluteRange: [0, 100],
        id: 'c822c798ba724e06b5fb25d2c18ff0cb'
    },
    FreshwaterAquatic_ImperiledAquaticSpecies: {
        label: 'Imperiled aquatic species',
        description: "Imperiled aquatic species measures the number of aquatic species within each watershed that are listed as G1 (globally critically imperiled), G2 (globally imperiled), or threatened/endangered under the U.S. Endangered Species Act. This indicator captures patterns of rare and endemic species diversity not well-represented by other freshwater aquatic indicators. It applies only to the Active River Area, which spatially defines the dynamic relationship between riverine systems and the lands around them; it includes meander belts, riparian wetlands, floodplains, terraces, and material contribution areas.",
        valueLabels: {
            0: 'No aquatic imperiled (G1/G2) or threatened/endangered species observed',
            1: '1 aquatic imperiled (G1/G2) or threatened/endangered species observed',
            2: '2 aquatic imperiled (G1/G2) or threatened/endangered species observed',
            3: '3 aquatic imperiled (G1/G2) or threatened/endangered species observed',
            4: '4 or more aquatic imperiled (G1/G2) or threatened/endangered species observed'
        },
        //categoricalValues: d3.range(0, 5),
        id: 'f6aa9bc688814468b5ae2772375c9fc2'
    },
    FreshwaterMarsh_Birds: {
        label: 'Freshwater marsh birds',
        description: 'Freshwater marsh birds is a continuous index of patch size. Larger patches are likely to support the following suite of freshwater marsh birds: least bittern, Northern pintail, Northern shoveler, and king rail.',
        valueLabels: {
            1: 'Less potential for presence of bird index species',
            2: 'Potential for presence of least bittern, Northern pintail, and Northern shoveler',
            3: 'Potential for additional presence of king rail'
        },
        categoricalValues: range(1, 4),
        categories: {
            1: '<5 ha',
            2: '5-20 ha',
            3: '>20 ha'
        },
        absoluteRange: [0, 11907],
        units: 'ha',
        id: '785b6209bae6492ba080df35c40cc5ba'
    },
    Landscapes_LowRoadDensityPatches: {
        label: 'Low road density',
        description: 'Low road density is an index of areas with few roads, measuring the length of roads within a square kilometer area. It represents habitat fragmentation. Extensive road networks are harmful to many species, including reptiles and amphibians, birds, and large mammals.',
        valueLabels: {
            0: 'High road density (\u22651.5 km/sq km)',
            1: 'Low road density (<1.5 km/sq km) '
        },
        categoricalValues: range(0, 2),
        id: '61856f9901d74185a34c08e857380395'
    },
    Landscapes_LowUrbanHistoric: {
        label: 'Low-urban historic landscapes',
        description: 'Low-urban historic landscapes is an index of sites on the National Register of Historic Places surrounded by limited urban development. This cultural resource indicator identifies significant historic places that remain connected to their context in the natural world.',
        valueLabels: {
            0: 'Not in the National Register of Historic Places',
            1: 'Historic place with nearby high-urban buffer',
            2: 'Historic place with nearby low-urban buffer'
        },
        categoricalValues: range(0, 3),
        id: '037ecaa254ff48f88969fc1db467d917'
    },
    Landscapes_ResilientBiodiversityHotspots: {
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
        id: '72cd46173b7b4801bfa88458b29d0d9b'
    },
    Marine_Mammals: {
        label: 'Marine mammals',
        description: 'Marine mammals is a continuous index of dolphin and whale density based on monthly density predictions for ten species of cetaceans and yearly density predictions for three rarer cetacean species. Marine mammals help identify key areas of ocean productivity and overall ocean health because they have long life spans, feed at high trophic levels, and can accumulate anthropogenic chemicals and toxins in their large blubber stores.',
        valueLabels: {
            1: 'Below the 20th percentile of importance for seasonal density of marine mammal index species',
            2: '20th-40th percentile of importance',
            3: '40th-60th percentile of importance',
            4: '60th-80th percentile of importance',
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
        absoluteRange: [0, 100],
        id: 'be70e3438a6e48d798916e788f35ef6b'
    },
    Marine_PotentialHardbottomCondition: {
        label: 'Potential hardbottom condition',
        description: 'Potential hardbottom condition measures the protected status or potential stress (i.e., shipping traffic, dredge disposal) of solid substrate and rocky outcroppings. Hardbottom provides an anchor for important seafloor habitat such as deepwater corals, plants, and sponges, supporting associated invertebrate and fish species.',
        valueLabels: {
            0: 'Hardbottom not predicted',
            1: 'Hardbottom likely to be stressed by human activities',
            2: 'Hardbottom less likely to be stressed by human activities',
            3: 'Hardbottom likely to be in best condition due to additional protections'
        },
        categoricalValues: range(0, 4),
        id: 'cbb923b746fc435b93d079f9261fa7c2'
    },
    PineAndPrairie_Amphibians: {
        label: 'Pine and prairie amphibians',
        description: 'Pine and prairie amphibians draws from the Priority Amphibian and Reptile Conservation Areas (PARCAs) located in pine and prairie habitat. PARCA is an expert-driven, nonregulatory designation that captures places capable of supporting viable amphibian and reptile populations. PARCAs include areas where rare or at-risk species have been observed or are likely to occur (like embedded, isolated wetlands).',
        valueLabels: {
            0: 'Not a Priority Amphibian and Reptile Conservation \nArea (PARCA) within pine and prairie',
            1: 'Priority Amphibian and Reptile Conservation Area \n(PARCA) within pine and prairie'
        },
        categoricalValues: range(0, 2),
        id: '89c74fcd28b14683ae2322211104e56c'
    },
    PineAndPrairie_Birds: {
        label: 'Pine and prairie birds',
        description: "Pine and prairie birds is an index of habitat suitability for three bird species (Northern bobwhite, red-cockaded woodpecker, Bachman's sparrow) based on observational data and predictive models. The presence of all three species indicates high pine ecosystem quality.",
        valueLabels: {
            0: 'Less potential for presence of bird index species',
            1: 'Potential for presence of 1 bird index species',
            2: 'Potential for presence of 2 bird index species',
            3: "Potential for presence of all \n3 bird index species (Bachman's sparrow, \nbobwhite quail, and red-cockaded woodpecker)"
        },
        categoricalValues: range(0, 4),
        id: '68f3ce917278453a82afcd280b5ec84b'
    },
    PineAndPrairie_RegularlyBurnedHabitat: {
        label: 'Regularly burned habitat',
        description: 'Regularly burned habitat is an an indicator of acres of fire-maintained, open canopy habitat. It attempts to capture recent fire in the pine ecosystem by using LANDFIRE data (1999-2010) as a proxy for regularly burned habitat.',
        valueLabels: {
            0: 'Not recently burned or not open canopy',
            1: 'Recently burned and open canopy'
        },
        categoricalValues: range(0, 2),
        id: 'ea13b5d4f83d4e27bc8bfc8878a85b2c'
    },
    UplandHardwoods_Birds: {
        label: 'Upland hardwood birds',
        description: "Upland hardwood birds is an index of habitat suitability for seven upland hardwood bird species (wood thrush, whip-poor-will, hooded warbler, American woodcock, Acadian flycatcher, Kentucky warbler, Swainson's warbler) based on patch size and other ecosystem characteristics such as proximity to water and proximity to forest and ecotone edge. The needs of these species are increasingly restrictive at higher index values, reflecting better quality habitat.",
        valueLabels: {
            0: 'Less potential for presence of \nbird index species',
            1: 'Potential for presence of wood \nthrush or whip-poor-will',
            2: 'Potential for additional presence \nof hooded warbler or American woodcock',
            3: 'Potential for additional presence \nof Acadian flycatcher or Kentucky warbler',
            4: "Potential for additional presence \nof Swainson's warbler"
        },
        categoricalValues: range(0, 5),
        id: '9a98b3bf45fc4d2aa0833a171b56533a'
    },
    UplandHardwood_UrbanOpenSpace: {
        label: 'Urban open space',
        description: 'Urban open space is an index based on distance of urban areas from open space. This cultural resource indicator is intended to capture equitable access to open space for urban residents. Protected natural areas in urban environments offer refugia for some species while providing people a nearby place to connect with nature.',
        valueLabels: {
            0: 'Existing development',
            1: 'Undeveloped area <400 m from protected land',
            2: 'Undeveloped area 400-800 m from protected land',
            3: 'Undeveloped area 800-1600 m from protected land',
            4: 'Undeveloped area >1600 m from protected land',
            5: 'Protected land'
        },
        categoricalValues: range(0, 6),
        id: 'c0039f1c66c14115ba8b5f51ee22ef97'
    },
    Waterscapes_MigratoryFishConnectivity: {
        label: 'Migratory fish connectivity',
        description: 'Migratory fish connectivity is an index capturing how far upstream migratory fish have been observed. It also includes adjacent areas where habitat access could be restored through fish passage and hydrological barrier removal efforts. Migratory fish presence reflects uninterrupted connections between freshwater, estuarine, and marine ecosystems.',
        valueLabels: {
            1: 'Migratory fish connectivity index species not adjacent/not observed',
            2: 'Adjacent to presence of migratory fish connectivity index species',
            3: 'Presence of Alabama shad, American shad, blueback herring, or striped bass',
            4: 'Presence of Gulf or Atlantic sturgeon'
        },
        categoricalValues: range(1, 5),
        id: '955b5af8b2e24648a11b4a0134c0b285'
    },
    Waterscapes_NetworkComplexity: {
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
        id: '88e4e923d1e94e1d833f0cfd5bb93d5e'
    }
};

var indicatorKeys = keys(indicators);

//derived from: colorbrewer.RdPu[9], shifted right 1 color
var indicatorColorScale = scale.quantize().range(["#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a", '#33004a']);


//Note: these have to be rerun whenever the indicator data change
var indicatorMeans = {
    'PineAndPrairie_RegularlyBurnedHabitat': 0.25,
    'PineAndPrairie_Birds': 0.62,
    'FreshwaterAquatic_ImperiledAquaticSpecies': 0.74,
    'Waterscapes_NetworkComplexity': 4.66,
    'ForestedWetland_Birds': 1.09,
    'ForestedWetland_Amphibians': 0.24,
    'Landscapes_LowRoadDensityPatches': 0.19,
    'PineAndPrairie_Amphibians': 0.16,
    'BeachAndDune_BeachBirds': 55.01,
    'Estuarine_CoastalCondition': 3.75,
    'Waterscapes_MigratoryFishConnectivity': 1.78,
    'EstuarineMarsh_WetlandPatchSize': 1.86,
    'FreshwaterMarsh_Birds': 219.51,
    'BeachAndDune_UnalteredBeach': 1.18,
    'FreshwaterAquatic_PermeableSurface': 97.96,
    'EstuarineMarsh_Water_VegetationEdge': 2.01,
    'Landscapes_ResilientBiodiversityHotspots': 3.60,
    'FreshwaterAquatic_RiparianBuffers': 82.82,
    'Landscapes_LowUrbanHistoric': 0.02,
    'UplandHardwood_UrbanOpenSpace': 2.75,
    'Marine_Mammals': 32.85,
    'Marine_PotentialHardbottomCondition': 0.05,
    'UplandHardwoods_Birds': 2.15
};