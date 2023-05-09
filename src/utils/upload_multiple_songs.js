const { uploadSong } = require("./cloudinary")
const fs = require("fs-extra");

async function uploadMultipleSongs(body, arraySongs) {

    const data = []
        for(const [index, file] of arraySongs.entries()){
        const { public_id, secure_url } = await uploadSong(file.tempFilePath)
        await fs.unlink(file.tempFilePath)

        const dataToPush = {
            file: {
                public_id,
                secure_url,
            },
            owner: body.owner[index],
            title: body.title[index],
            feat: body.feat[index],
            album: body.album[index]
        }
        data.push(dataToPush)
    }
        return data;

}

module.exports = uploadMultipleSongs;