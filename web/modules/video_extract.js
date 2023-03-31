class VideoFrameExtractor {
    constructor(videoInputId) {
        this.videoInput = document.getElementById(videoInputId);
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.frames = [];

        this.init();
    }

    init() {
        this.videoInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);

        await new Promise((resolve) => {
            video.addEventListener('loadedmetadata', () => {
            this.canvas.width = video.videoWidth;
            this.canvas.height = video.videoHeight;
            resolve();
            });
        });
        
        await this.processVideo(video);
        console.log(`${this.videoInput.id}의 총 ${this.frames.length} 개의 프레임이 추출되었습니다.`);
        console.log('this is client')

        });
    }

    async processVideo(video) {
        const interval = 1000;
        let currentTime = 0;

        while (currentTime < video.duration) {
            video.currentTime = currentTime;
            await new Promise((resolve) => video.addEventListener('seeked', resolve, { once: true }));
            await this.captureFrame(video);
            currentTime += interval / 1000;
        }
    }

    async captureFrame(video) {
        return new Promise((resolve) => {
            this.ctx.drawImage(video, 0, 0);
            this.canvas.toBlob((blob) => {
            this.frames.push(blob);
            resolve();
            });
        });
    }
}

export { VideoFrameExtractor } 