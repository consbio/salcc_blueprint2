"""
Process tabular data to create a JSON file for each watershed or marine block for use in the application.

Run this after export_tables.py
"""


import os
from collections import defaultdict
import json
import numpy as np
import pandas as pd


src_dir = './source_data'
out_dir = './public/data'

if not os.path.exists(out_dir):
    os.makedirs(out_dir)


def to_titlecase(text):
    return ''.join(x.capitalize() for x in text.lower().split('_') if x)


inland_indicator_tables = [
    'TabArea_BeachAndDune_BeachBirds_V_2_2_BinnedClip',
    'TabArea_BeachAndDune_UnalteredBeach_V_2_2Clip',
    'TabArea_EstuarineMarsh_Water_VegetationEdge_V_2_0Clip',
    'TabArea_EstuarineMarsh_WetlandPatchSize_V_2_0Clip',
    'TabArea_Estuarine_CoastalCondition_V_2_1_BinnedClip',
    'TabArea_ForestedWetland_Amphibians_V_2_1Clip',
    'TabArea_ForestedWetland_Birds_V_2_1Clip',
    'TabArea_ForestedWetland_Extent_V_2_2_NoDataTo0_ClipToEcosystemMaskClip',
    'TabArea_FreshwaterAquatic_ImperiledAquaticSpecies_V_2_1Clip',
    'TabArea_FreshwaterAquatic_PermeableSurface_V_2_1_BinnedClip',
    'TabArea_FreshwaterAquatic_RiparianBuffers_V_2_1_BinnedClip',
    'TabArea_FreshwaterMarsh_Birds_V_2_1_BinnedClip',
    'TabArea_FreshwaterMarsh_Extent_V_2_2_NoDataTo0_ClipToEcosystemMaskClip',
    'TabArea_Landscapes_LowRoadDensityPatches_V_2_1Clip',
    'TabArea_Landscapes_LowUrbanHistoric_V_2_1_SOTClip',
    'TabArea_Landscapes_ResilientBiodiversityHotspots_V_2_2Clip',
    'TabArea_MaritimeForest_Extent_V_2_0_NoDataTo0_ClipToEcosystemMaskClip',
    'TabArea_PineAndPrairie_Amphibians_V_2_1Clip',
    'TabArea_PineAndPrairie_Birds_V_2_1Clip',
    'TabArea_PineAndPrairie_RegularlyBurnedHabitat_V_2_0Clip',
    'TabArea_UplandHardwood_UrbanOpenSpace_V_2_1Clip',
    'TabArea_UplandHardwoods_Birds_V_2_0Clip',
    'TabArea_Waterscapes_MigratoryFishConnectivity_V_2_1Clip',
    'TabArea_Waterscapes_NetworkComplexity_V_2_1Clip'
]

# Use the feature classes instead because these have the block IDs
marine_indicator_tables = [
    'TabArea_Marine_PotentialHardbottomCondition_V_2_0Clip',
    'TabArea_Marine_Birds_V_2_2_BinnedClip',
    'TabArea_Marine_Mammals_V_2_1_BinnedClip',
]

urbanization_years = [2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100]
urbanization_filename = 'TabArea_0_serap_urb{year}_IsNull0.csv'
slr_filename = 'TabArea_slra_alb30m_IsNull0.csv'
slr_levels = ['0_5', '1', '1_5', '2', '2_5', '3', '3_5', '4', '4_5', '5',
              '5_5', '6', '6_5', '7', '7_5', '8', '8_5', '9', '9_5', '10']

indicator_avg = defaultdict(list)
indicator_area = defaultdict(list)


################ INLAND ######################

# Extract counties by watershed.
print('Reading states')
fips_state = dict()
df = pd.read_csv(os.path.join(src_dir, 'tl_2015_us_state.csv'))
for index, row in df.iterrows():
    fips_state[row['STATEFP']] = row['NAME']

print('Reading counties')
# Intersection was run by hand in ArcGIS, output inland_counties
huc_counties = defaultdict(dict)
df = pd.read_csv(os.path.join(src_dir, 'inland_counties.csv'),
                 dtype={'HUC12': str})
for index, row in df.iterrows():
    fips = '{0}{1:0>3}'.format(row['STATEFP'], row['COUNTYFP'])
    huc_counties[row['HUC12']][fips] = '{0}, {1}'.format(
        row['NAMELSAD'], fips_state[row['STATEFP']])


# Extract bounds
print('Reading bounds')
inland_bounds = dict()
df = pd.read_csv(os.path.join(
    src_dir, 'huc12rng_ga0_SALCC_HUC12Names.csv'), dtype={'HUC12': str})
for index, row in df.iterrows():
    inland_bounds[row['HUC12']] = [float(x) for x in row['bounds'].split(',')]


# Extract ownership by HUC
print('Reading ownership')
# [huc]['owner' or 'gap'][key] = area
ownership_data = defaultdict(lambda: defaultdict(lambda: defaultdict(float)))
df = pd.read_csv(os.path.join(
    src_dir, 'TabArea_TNCExternalSecuredAreas2015Div_FeeOrgtype.csv'), dtype={'HUC12': str})
for index, row in df.iterrows():
    huc = row['HUC12']
    for field in ['FED', 'LOC', 'PFP', 'PLO', 'STP', 'TNC', 'TRB', 'UNK']:
        acres = row[field] * 0.000247105  # sq m to acres
        if acres >= 10:
            ownership_data[huc]['owner'][field] += acres


print('Reading protection')
df = pd.read_csv(os.path.join(
    src_dir, 'TabArea_TNCExternalSecuredAreas2015Div_GapStatus.csv'), dtype={'HUC12': str})
for index, row in df.iterrows():
    huc = row['HUC12']
    for field in ['GAP_S_1', 'GAP_S_2', 'GAP_S_3', 'GAP_S_39', 'GAP_S_4', 'GAP_S_9']:
        acres = row[field] * 0.000247105  # sq m to acres
        if acres >= 10:
            ownership_data[huc]['gap'][int(
                field.replace('GAP_S_', ''))] += acres


# Extract ecosystems by HUC
print('Reading ecosystems')
ecosystems = defaultdict(lambda: defaultdict(float))
df = pd.read_csv(os.path.join(
    src_dir, 'TabArea_EcosystemMask_20160229_Blueprint_2_1_AnalysisArea_EcosystemName.csv'), dtype={'HUC12': str})
fields = [str(x) for x in df.columns if 'ESTUARIES__' not in x and x not in (
    'geometry', 'HUC12', 'SumForAllEcosystems')]
ecosystemIDs = {'Landscapes', 'Waterscapes',
                'FreshwaterAquatic'}  # Add cross-system ecosystems
for index, row in df.iterrows():
    total_area = sum(row[f] for f in fields)  # row['SumAreaForAllEcosystems']
    if total_area > 0:
        for field in fields:
            if row[field] > 0:
                # For purposes of ecosystems and indicators, it is Estuarine
                name = to_titlecase(field.replace(
                    'EstuariesCombined', 'Estuarine'))
                ecosystemIDs.add(name)
                ecosystems[row['HUC12']][name] = int(round(
                    100.0 * row[field] / total_area, 0)) or 0

# print('Ecoystems:\n', ecosystemIDs)


# Extract plans and justification by HUC
print('Reading plans')
inland_plan_fields = ['PARCA', 'TNC', 'EPA', 'ACJV', 'NBCI',
                      'Alabama', 'Florida', 'NorthCarolina', 'Virginia', 'Georgia']
huc_plans = dict()
justification = dict()
df = pd.read_csv(os.path.join(
    src_dir, 'JustifiationCleanUp2017_InlandBlueprint_1_0_07Sept2014.csv'), dtype={'HUC12': str})
for index, row in df.iterrows():
    huc = row['HUC12']
    huc_plans[huc] = [
        field for field in inland_plan_fields if field in df.columns and row[field].strip()]
    value = str(row['Justification'])
    if value != 'nan':
        justification[huc] = value


# Extract inland indicators by HUC
print('Reading indicators')
inland_indicators = defaultdict(lambda: defaultdict(
    lambda: defaultdict(list)))  # HUC:ecosystem:indicator
for table in inland_indicator_tables:
    print('Reading: {0}'.format(table))
    df = pd.read_csv(os.path.join(
        src_dir, '{0}.csv'.format(table)), dtype={'HUC12': str})
    fields = [x for x in df.columns if x.startswith('VALUE_')]

    # Fix the name to match the standard
    indicator = table.replace('TabArea_', '').replace('_V_2_1', '').replace('_SimpleViewer', '').replace('_V_2_0', '').replace('_V_2_2', '').replace('_BinnedClip', '').replace(
        '_NoDataTo0_ClipToEcosystemMaskClip', '').replace('_SOTClip', '').replace('Clip', '').replace('Water_', 'Water').replace('EstuarineMarsh', 'Estuarine').replace('Hardwoods', 'Hardwood')
    print('==>{}'.format(indicator))

    ecosystem, indicator = indicator.split('_')
    if not ecosystem in ecosystemIDs:
        raise ValueError(
            ecosystem + ' not in ecosystem list, indicator: {0}'.format(indicator))

    for index, row in df.iterrows():
        total_area = sum([row[f] for f in fields])
        inland_indicators[row['HUC12']][ecosystem][indicator] = [round(
            100.0 * row[f] / total_area, 1) or 0 for f in fields]  # values are in percent


inland_indicator_stats = defaultdict(lambda: defaultdict(lambda: defaultdict(
    float)))  # HUC:ecosystem:indicator, values are [min, mean, max]
for table in inland_indicator_tables:
    table = table.replace('TabArea_', 'Zstat_').replace(
        '_SimpleViewer', '').replace('_BinnedClip', 'Clip')
    print('Reading: {0}'.format(table))
    df = pd.read_csv(os.path.join(
        src_dir, '{0}.csv'.format(table)), dtype={'HUC12': str})
    fields = [x for x in df.columns if x.startswith('VALUE_')]
    indicator = table.replace('Zstat_', '').replace('_V_2_1', '').replace('_SimpleViewer', '').replace('_V_2_0', '').replace('_V_2_2', '').replace(
        '_NoDataTo0_ClipToEcosystemMaskClip', '').replace('_SOTClip', '').replace('Clip', '').replace('Water_', 'Water').replace('EstuarineMarsh', 'Estuarine').replace('Hardwoods', 'Hardwood')
    print('==>{}'.format(indicator))
    ecosystem, indicator = indicator.split('_')
    if not ecosystem in ecosystemIDs:
        raise ValueError(
            ecosystem + ' not in ecosystem list, indicator: {0}'.format(indicator))

    for index, row in df.iterrows():
        unitMean = row['MEAN']
        if not np.isnan(unitMean):
            unitMin = row['MIN']
            unitMax = row['MAX']
            inland_indicator_stats[row['HUC12']][ecosystem][indicator] = [
                round(unitMin, 4) or 0, round(unitMean, 4) or 0, round(unitMax, 4) or 0]
            indicator_avg[indicator].append(unitMean)
            indicator_area[indicator].append(row['COUNT'])  # Pixel count


# Extract Blueprint tab area
print('Reading blueprint')
inland_blueprint = defaultdict(list)
df = pd.read_csv(os.path.join(
    src_dir, 'TabArea_Blueprint_2_2_Descript_huc12.csv'), dtype={'HUC12': str})
fields = ['NOT_A_PRIORITY_FOR_SHARED_ACTION', 'INLAND_WATERBODIES',
          'CORRIDORS', 'MEDIUM_PRIORITY', 'HIGH_PRIORITY', 'HIGHEST_PRIORITY']
for index, row in df.iterrows():
    total_area = sum(row[f] for f in fields)
    if total_area / 40000.0 < 5:
        continue  # Only keep units with > 5 pixels

    huc = row['HUC12']
    inland_blueprint[huc] = [int(round(100.0 * row[f] / total_area))
                             for f in fields]  # values are in percents


# Extract urbanization
# we only need HUC12 and PercentUrb
print('reading urbanization')
inland_urbanization = defaultdict(list)
for year in urbanization_years:
    df = pd.read_csv(os.path.join(
        src_dir, urbanization_filename.format(year=year)), dtype={'HUC12': str})
    for index, row in df.iterrows():
        huc = row['HUC12']
        # bug PercentUrb is actually proportion not percent
        inland_urbanization[huc].append(int(round(100.0 * row['PercentUrb'])))

# Extract sea level rise in 0.5 foot increments from 0.5 to 10 feet
print('reading SLR')
inland_slr = defaultdict(list)
df = pd.read_csv(os.path.join(src_dir, slr_filename), dtype={'HUC12': str})
# level is each 1/2 foot increase in SLR
for index, row in df.iterrows():
    huc = row['HUC12']
    total_area = row['PixelArea30m']
    inland_slr[huc] = [int(round(100.0 * row['MigrationSpace_{}'.format(level)] / total_area))
                       for level in slr_levels]  # values are in percents


# Write each feature as JSON
# inland_v2.csv is outdated, but since the watershed geometries were based on it, use it to join ID to HUC

df = pd.read_csv(os.path.join(src_dir, 'inland_v2.csv'), dtype={'HUC12': str})
for index, row in df.iterrows():
    huc = row['HUC12']
    ID = row['ID']
    acres = 0.000247105 * row['Shape_Area']
    # print(ID, huc)

    ecosystems_obj = {}
    for ecosystemID in ecosystemIDs:
        ecosystem = {}
        if ecosystemID in ecosystems[huc]:
            ecosystem['percent'] = ecosystems[huc][ecosystemID]
        if huc in inland_indicators and ecosystemID in inland_indicators[huc]:
            ecosystem['indicators'] = defaultdict(dict)
            for indicator in inland_indicators[huc][ecosystemID]:
                unitMin, unitMean, unitMax = inland_indicator_stats[huc][ecosystemID][indicator]
                ecosystem['indicators'][indicator] = {
                    'percent': inland_indicators[huc][ecosystemID][indicator],
                    'min': unitMin,
                    'mean': unitMean,
                    'max': unitMax
                }
        if ecosystem:
            if 'percent' in ecosystem:
                # only keep ecosystems that are >=1% of the area
                if ecosystem['percent'] >= 1:
                    ecosystems_obj[ecosystemID] = ecosystem
            else:
                ecosystems_obj[ecosystemID] = ecosystem

    slr = inland_slr.get(huc, None)
    if slr is None or max(slr) == 0:
        slr = None

    urbanization = inland_urbanization.get(huc, None)
    if urbanization is None or max(urbanization) == 0:
        urbanization = None

    props = {
        'SRCID': huc,
        'name': row['HU_12_NAME'],
        'basin': row['BASIN'],
        'justification': justification.get(huc, ''),
        'blueprint': inland_blueprint[huc],
        'acres': int(round(acres, 0)),
        'plans': huc_plans.get(huc, []),
        'counties': huc_counties.get(huc, {}),
        'ecosystems': ecosystems_obj,
        'slr': slr,
        'urban': urbanization,
        'bounds': inland_bounds[huc]
    }

    if huc in ownership_data:
        props['owner'] = {k: round(100.0 * v / acres, 1)
                          for k, v in ownership_data[huc]['owner'].items()}
        props['gap'] = {k: round(100.0 * v / acres, 1)
                        for k, v in ownership_data[huc]['gap'].items()}

    with open(os.path.join(out_dir, '{0}.json'.format(ID)), 'w') as outfile:
        outfile.write(json.dumps(props))


# #################################  Marine ##########################################

# Extract marine block IDs
print('reading marine block IDs')
marine_ids = dict()  # Unique => PROT_NUMBE-BLOCK_NUMB
marine_bounds = dict()  # PROT_NUMBE-BLOCK_NUMB => bounds
df = pd.read_csv(os.path.join(src_dir, 'SALCCMarineLeaseBlocks.csv'))
for index, row in df.iterrows():
    id = '{0}-{1}'.format(row['PROT_NUMBE'].strip(), row['BLOCK_NUMB'])
    marine_ids[row['Unique']] = id
    marine_bounds[id] = [float(x) for x in row['bounds'].split(',')]


# Extract marine indicators by block
marine_indicators = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
for table in marine_indicator_tables:
    print('Reading: {0}'.format(table))
    df = pd.read_csv(os.path.join(src_dir, '{0}.csv'.format(table)))
    fields = [x for x in df.columns if x.startswith('VALUE_')]
    indicator = table.replace('TabArea_', '').replace('Zstat_', '').replace('SALCCMarineLeaseBlocks_TabArea_', '').replace(
        '_V_2_1', '').replace('_SimpleViewer', '').replace('_V_2_0', '').replace('_V_2_2', '').replace('Clip', '').replace('_Binned', '')
    print('==>{}'.format(indicator))
    ecosystem, indicator = indicator.split('_')
    for index, row in df.iterrows():
        unit = marine_ids[row['UNIQUE']]
        if not np.isnan(row[fields[0]]):
            total_area = sum([row[f] for f in fields])
            marine_indicators[unit][ecosystem][indicator] = [round(100.0 * row[f] / total_area, 1) or 0 for f in
                                                             fields]  # values are in percent

marine_indicator_stats = defaultdict(lambda: defaultdict(
    lambda: defaultdict(float)))  # values are [min, mean, max]
for table in marine_indicator_tables:
    table = table.replace('TabArea_', 'Zstat_').replace(
        '_SimpleViewer', '').replace('_BinnedClip', 'Clip')
    print('Reading: {0}'.format(table))
    df = pd.read_csv(os.path.join(src_dir, '{0}.csv'.format(table)))
    fields = [x for x in df.columns if x.startswith('VALUE_')]
    indicator = table.replace('TabArea_', '').replace('Zstat_', '').replace('SALCCMarineLeaseBlocks_Zstat_', '').replace(
        '_V_2_1', '').replace('_V_2_0', '').replace('_V_2_2', '').replace('Clip', '').replace('_Binned', '')
    print('==>{}'.format(indicator))
    ecosystem, indicator = indicator.split('_')
    for index, row in df.iterrows():
        unit = marine_ids[row['Unique']]
        unitMean = row['MEAN']
        if not np.isnan(unitMean):
            unitMin = row['MIN']
            unitMax = row['MAX']
            marine_indicator_stats[unit][ecosystem][indicator] = [round(unitMin, 4) or 0, round(unitMean, 4) or 0,
                                                                  round(unitMax, 4) or 0]
            indicator_avg[indicator].append(unitMean)
            indicator_area[indicator].append(row['COUNT'])  # Pixel count


# Extract Blueprint tab area
marine_blueprint = defaultdict(list)
df = pd.read_csv(os.path.join(
    src_dir, 'TabArea_Blueprint_2_2_Descript_MarineLeaseBlocks.csv'))
fields = ['NOT_A_PRIORITY_FOR_SHARED_ACTION', 'CORRIDORS',
          'MEDIUM_PRIORITY', 'HIGH_PRIORITY', 'HIGHEST_PRIORITY']
for index, row in df.iterrows():
    total_area = sum(row[f] for f in fields)
    unit = marine_ids[row['UNIQUE']]
    data = [int(round(100.0 * row[f] / total_area))
            for f in fields]  # values are in percents
    # insert placeholder for inland waterbodies in position 1
    data.insert(1, 0)
    marine_blueprint[unit] = data


marine_plan_fields = ['ViewSheds', 'ImportantBirdAreas', 'SnapperHAPC',
                      'SAFMC_HAPC_wDeepwater_Coral', 'ShelfBreak', 'RightWhale', 'NC_Capes']


print('Writing output marine features')
# Write each feature as JSON
# marine_v2.csv is outdated, but matches the features in the map service.  Use to join JOIN_ID to unit
df = pd.read_csv(os.path.join(src_dir, 'marine_v2.csv'))
for index, row in df.iterrows():
    unit = '{0}-{1}'.format(row['PROT_NUMBE'].strip(), row['BLOCK_NUMB'])
    ID = 'M{0}'.format(row['JOIN_ID'])

    ecosystems_obj = {}
    for ecosystemID in ['Marine']:
        ecosystem = {'percent': 100}  # Hardcoded percent
        if unit in marine_indicators:
            ecosystem['indicators'] = defaultdict(dict)
            for indicator in marine_indicators[unit][ecosystemID]:
                unitMin, unitMean, unitMax = marine_indicator_stats[unit][ecosystemID][indicator]
                ecosystem['indicators'][indicator] = {
                    'percent': marine_indicators[unit][ecosystemID][indicator],
                    'min': unitMin,
                    'mean': unitMean,
                    'max': unitMax
                }

        ecosystems_obj[ecosystemID] = ecosystem

    props = {
        'name': '{0}: Block {1}'.format(row.PROT_NUMBE, row.BLOCK_NUMB),
        'blueprint': marine_blueprint[unit],
        'acres': int(round(0.000247105 * row['Shape_Area'], 0)),
        'plans': [field for field in marine_plan_fields if str(row[field]) != 'nan' and row[field].strip()],
        'ecosystems': ecosystems_obj,
        'bounds': marine_bounds[unit]
    }

    with open(os.path.join(out_dir, '{0}.json'.format(ID)), 'w') as outfile:
        outfile.write(json.dumps(props))
