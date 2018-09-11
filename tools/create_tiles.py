import os
import json

from datatiles.encoding import encode_tifs
from datatiles.mbtiles import tif_to_mbtiles, render_tif_to_mbtiles


max_zoom = 15
datatiles_tile_size = (
    128
)  # Note: this must be set into 'imageSize' in the corresponding Leaflet.DataTileLayer in the frontend
data_dir = "/Volumes/data/projects/SA_LCC/Conservation_Blueprint_2.2/data/source/"
tile_dir = "./tiles"

# visible Blueprint layer
render_tif_to_mbtiles(
    os.path.join(data_dir, "Blueprint_2_2.tif"),
    os.path.join(tile_dir, "blueprint2_2.mbtiles"),
    # Colors are the standard Blueprint 2.2 colors, in /config/priorities.json
    colormap={1: "#004DA8", 2: "#686868", 3: "#fbb4b9", 4: "#c51b8a", 5: "#49006a"},
    min_zoom=0,
    max_zoom=max_zoom,
    metadata={
        "name": "South Atlantic Conservation Blueprint v2.2",
        "description": "South Atlantic Conservation Blueprint v2.2",
        "attribution": "South Atlantic Blueprint 2018",
    },
)


# Data tiles (blueprint & indicators)
# Note: the encoding JSON that results from running the following is pasted into /config/encoding.json

sources = {
    "2": {
        # Binary: presence / absence or nodata (3 values)
        "ForestedWetland_Amphibians": {
            "source": os.path.join(data_dir, "ForestedWetland_Amphibians_V_2_1Clip.tif")
        },
        "ForestedWetland_Extent": {
            "source": os.path.join(
                data_dir,
                "ForestedWetland_Extent_V_2_2_NoDataTo0_ClipToEcosystemMaskClip.tif",
            )
        },
        "FreshwaterMarsh_Extent": {
            "source": os.path.join(
                data_dir,
                "FreshwaterMarsh_Extent_V_2_2_NoDataTo0_ClipToEcosystemMaskClip.tif",
            )
        },
        "Landscapes_LowRoadDensityPatches": {
            "source": os.path.join(
                data_dir, "Landscapes_LowRoadDensityPatches_V_2_1Clip.tif"
            )
        },
        "Landscapes_LowUrbanHistoric": {
            "source": os.path.join(
                data_dir, "Landscapes_LowUrbanHistoric_V_2_1_SOTClip.tif"
            )
        },
        "MaritimeForest_Extent": {
            "source": os.path.join(
                data_dir,
                "MaritimeForest_Extent_V_2_0_NoDataTo0_ClipToEcosystemMaskClip.tif",
            )
        },
        "PineAndPrairie_Amphibians": {
            "source": os.path.join(data_dir, "PineAndPrairie_Amphibians_V_2_1Clip.tif")
        },
        "PineAndPrairie_RegularlyBurnedHabitat": {
            "source": os.path.join(
                data_dir, "PineAndPrairie_RegularlyBurnedHabitat_V_2_0Clip.tif"
            )
        },
    },
    "3": {
        # 3 values
        "BeachAndDune_UnalteredBeach": {
            "source": os.path.join(
                data_dir, "BeachAndDune_UnalteredBeach_V_2_2Clip.tif"
            )
        },
        "FreshwaterMarsh_Birds": {
            "source": os.path.join(
                data_dir, "FreshwaterMarsh_Birds_V_2_1_BinnedClip.tif"
            )
        },
        # 4 values
        "ForestedWetland_Birds": {
            "source": os.path.join(data_dir, "ForestedWetland_Birds_V_2_1Clip.tif")
        },
        "FreshwaterAquatic_PermeableSurface": {
            "source": os.path.join(
                data_dir, "FreshwaterAquatic_PermeableSurface_V_2_1_BinnedClip.tif"
            )
        },
        "PineAndPrairie_Birds": {
            "source": os.path.join(data_dir, "PineAndPrairie_Birds_V_2_1Clip.tif")
        },
        "Waterscapes_MigratoryFishConnectivity": {
            "source": os.path.join(
                data_dir, "Waterscapes_MigratoryFishConnectivity_V_2_1Clip.tif"
            )
        },
    },
    "5": {
        "BeachAndDune_BeachBirds": {
            "source": os.path.join(
                data_dir, "BeachAndDune_BeachBirds_V_2_2_BinnedClip.tif"
            )
        },
        "Estuarine_CoastalCondition": {
            "source": os.path.join(
                data_dir, "Estuarine_CoastalCondition_V_2_1_BinnedClip.tif"
            )
        },
        "Estuarine_WaterVegetationEdge": {
            "source": os.path.join(
                data_dir, "EstuarineMarsh_Water_VegetationEdge_V_2_0Clip.tif"
            )
        },
        "Estuarine_WetlandPatchSize": {
            "source": os.path.join(
                data_dir, "EstuarineMarsh_WetlandPatchSize_V_2_0Clip.tif"
            )
        },
        "FreshwaterAquatic_ImperiledAquaticSpecies": {
            "source": os.path.join(
                data_dir, "FreshwaterAquatic_ImperiledAquaticSpecies_V_2_1Clip.tif"
            )
        },
        "FreshwaterAquatic_RiparianBuffers": {
            "source": os.path.join(
                data_dir, "FreshwaterAquatic_RiparianBuffers_V_2_1_BinnedClip.tif"
            )
        },
        "Marine_Birds": {
            "source": os.path.join(data_dir, "Marine_Birds_V_2_2_BinnedClip.tif")
        },
        "Marine_Mammals": {
            "source": os.path.join(data_dir, "Marine_Mammals_V_2_1_BinnedClip.tif")
        },
    },
    "7": {
        # 5 values, spillover from above
        "Marine_PotentialHardbottomCondition": {
            "source": os.path.join(
                data_dir, "Marine_PotentialHardbottomCondition_V_2_0Clip.tif"
            )
        },
        "UplandHardwood_Birds": {
            "source": os.path.join(data_dir, "UplandHardwood_Birds_V_2_0Clip.tif")
        },
        # 7 values
        "Blueprint": {"source": os.path.join(data_dir, "Blueprint_2_2.tif")},
        "UplandHardwood_UrbanOpenSpace": {
            "source": os.path.join(
                data_dir, "UplandHardwood_UrbanOpenSpace_V_2_1Clip.tif"
            )
        },
        # 8 values
        "Waterscapes_NetworkComplexity": {
            "source": os.path.join(
                data_dir, "Waterscapes_NetworkComplexity_V_2_1Clip.tif"
            )
        },
        # 9 values
        "Landscapes_ResilientBiodiversityHotspots": {
            "source": os.path.join(
                data_dir, "Landscapes_ResilientBiodiversityHotspots_V_2_2Clip.tif"
            )
        },
    },
}

for level in sources:
    print("Encoding level {}...".format)
    tmpfilename = "/tmp/encoding{}.tif".format(level)

    # Encode individual tifs to a single tif using exponential encoder
    encoding = encode_tifs(sources[level], tmpfilename, encoding="exponential")

    print("Encoding config is\n\n{}\n\n".format(json.dumps(encoding, indent=4)))

    # Convert the tif to tiles
    tif_to_mbtiles(
        tmpfilename,
        os.path.join(tile_dir, "encoding{}.mbtiles".format(level)),
        max_zoom=max_zoom,
        tile_size=datatiles_tile_size,
    )

