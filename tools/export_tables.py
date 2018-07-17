"""
Extract geodatabase tables (GDB) and shapefile attributes to CSVs for later processing (extract_data.py).

The geodatabase is provided by Amy Kiester at SALCC.  She ensures that this has everything we need.
"""


import os
import geopandas as gp
import fiona

src_dir = '/Volumes/data/projects/SA_LCC/Conservation_Blueprint_2.2/data/source'
out_dir = './source_data'

if not os.path.exists(out_dir):
    os.mkdir(out_dir)


# This GDB contains all the tabular summary data we need to extract for the Blueprint v2.2
gdb = os.path.join(
    src_dir, 'Blueprint_V_2_2_SimpleViewerInterfaceData_20171010/Blueprint_2_2_Data_Summaries.gdb')


fix_fields = ['Justification', 'WorkshopName']
for table in fiona.listlayers(gdb):
    print(table)
    df = gp.read_file(gdb, layer=table)

    for field in fix_fields:
        if field in df.columns:
            # fix unicode issues
            df[field] = df.apply(lambda row: row[field].replace(u'\u201c', '"').replace(
                u'\u201d', '"').strip().replace('\n', ' ').replace('\r', ''), axis=1)

    df.to_csv(os.path.join(out_dir, '{0}.csv'.format(table)), columns=[
              c for c in df if c != 'geometry'], index=False)  # dtype={'HUC12': str}


# This comes from the Census TIGER states shapefile.  Just dowload it from the TIGER website.
# We use this to figure out the state and county FIPS codes
df = gp.read_file(os.path.join(src_dir, 'tl_2015_us_state.shp'))
for index, row in df.iterrows():
    df.to_csv(os.path.join(out_dir, '{0}.csv'.format('tl_2015_us_state')), columns=[
              c for c in df if c != 'geometry'], index=False)


threats_gdb = os.path.join(
    src_dir, 'SimpleViewerInterfaceDataThreats', 'Threat_Summary_HUC12.gdb')

# sleuth urbanization 2020 - 2100, we only need HUC12 and PercentUrb
for year in [2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100]:
    table = 'TabArea_0_serap_urb{year}_IsNull0'.format(year=year)
    print(table)
    df = gp.read_file(threats_gdb, layer=table)
    df.to_csv(os.path.join(out_dir, '{0}.csv'.format(table)), columns=[
              c for c in df if c != 'geometry'], index=False)

# SLR, we only need HUC12 and PixelArea30m (need to calculate percents ourselves)
table = 'TabArea_slra_alb30m_IsNull0'
print(table)
df = gp.read_file(threats_gdb, layer=table)
df.to_csv(os.path.join(out_dir, '{0}.csv'.format(table)), columns=[
          c for c in df if c != 'geometry'], index=False)
