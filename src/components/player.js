class AudioPlayer {
    constructor() {
        this.selectedSongIndex = 0
        this.playlist = [
            'track1.mp3',
            'track2.mp3',
            'track3.mp3',
            'track4.mp3',
            'track5.mp3',
        ]
        this.populateSongList()
    }
  
    populateSongList() {
        const jsmediatags = window.jsmediatags
        this.playlist.forEach((songPath, index) => {
            const song = `https://audio-base-api.vercel.app/player/${this.playlist[index]}`
            const option = document.createElement('option')
            option.value = index
            

            jsmediatags.read(song, {
                onSuccess: (tag) => {
                    option.textContent = tag.tags.title
                },
                onError: function (err) {
                    console.error(err.message)
                }
            })

            songSelect.append(option)
        })
    }
  
    playSelectedSong() {
      this.selectedSongIndex = songSelect.value;
      if (this.selectedSongIndex >= 0 && this.selectedSongIndex < this.playlist.length) {
        audioPlayer.src = `https://audio-base-api.vercel.app/player/${this.playlist[this.selectedSongIndex]}`
        const playPromise = audioPlayer.play()
        if (playPromise !== null) {
            playPromise.catch(() => { })
        }
      }
    }
    
    showSongTags() {
        const song = `https://audio-base-api.vercel.app/player/${this.playlist[this.selectedSongIndex]}`
        const jsmediatags = window.jsmediatags

        jsmediatags.read(song, {
            onSuccess: function (tag) {
                try {
                    const data = tag.tags.picture.data
                    const format = tag.tags.picture.format
                    let base64String = ""
                    
                    for (let i = 0; i < data.length; i++) {
                        base64String += String.fromCharCode(data[i])
                    }
                    coverImage.src = `data:${format};base64,${window.btoa(base64String)}`
                } catch (err) {
                    console.warn('No image were found in the song')
                }
                
                songArtist.textContent = tag.tags.artist
                songTitle.textContent = tag.tags.title

            },
            onError: function (err) {
                console.error(err.message)
            }
        })
        
    }

    playPreviousSong() {
        this.selectedSongIndex = (this.selectedSongIndex - 1 + this.playlist.length) % this.playlist.length

        this.updateSelectedSong();
      }
    
    playNextSong() {
        this.selectedSongIndex === this.playlist.length ?
            this.selectedSongIndex = 0 :
            this.selectedSongIndex++

        this.updateSelectedSong()
    }


    updateSelectedSong() {
        songSelect.value = this.selectedSongIndex
        this.showSongTags()
        this.playSelectedSong()
    }
  
}
  
export { AudioPlayer }