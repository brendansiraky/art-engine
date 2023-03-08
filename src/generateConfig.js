// Going to try and generate the config rather than hard code.
const fs = require('fs')
const { chunk } = require('underscore')

const { LAYER_PATH } = require('./main')

const folderPath = `${__dirname}/../${LAYER_PATH}/`

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const makeLayerConfigurations = async () => {
    const [_, ...folders] = await fs.promises.readdir(folderPath)

    // Checking for errors
    folders.forEach(folder => {
        const arr = folder.split("_")
        const [collectionPosition, traitPosition, growEditionSizeTo] = arr // According to the naming convention in the folder. collectionsPosition / traitPosition / growEditionSizeTo

        if (!isNumeric(collectionPosition) || !isNumeric(traitPosition) || !isNumeric(growEditionSizeTo)) {
            throw new Error('Naming convention was incorrect')
        }
    })

    const chunked = chunk(folders, 5) // 5 traits per grouping

    const grouped = chunked.reduce((acc, folderGroup, index) => {

        const arr = folderGroup[0].split("_")
        const [collectionPosition, traitPosition, growEditionSizeTo] = arr

        acc.push({
            growEditionSizeTo: growEditionSizeTo,
            layersOrder: folderGroup.map(f => ({
                name: f
            })) 
        })

        return acc
    }, [])

    return grouped
}

module.exports = { makeLayerConfigurations }

// makeLayerConfiguration().then(r => {
//     console.log(JSON.stringify(r, null, 2))
// })
