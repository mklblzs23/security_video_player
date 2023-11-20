import video1 from './assets/test_1.mp4';
import test1 from './assets/test_1.json';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="w-screen">
      <VideoPlayer
        video={video1}
        shapeData={test1}
        className="m-24"
      />
    </div>
  )
}

export default App
