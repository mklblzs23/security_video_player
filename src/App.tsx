import video1 from './assets/test_1.mp4';
import test1 from './assets/test_1.json';
import video2 from './assets/test_2.mp4';
import test2 from './assets/test_2.json';
import Navbar from './components/Navbar';
import { useState } from 'react';
import NavbarButton from './components/NavbarButton';
import VideoPlayer from './components/VideoPlayer';

type Shape = {
  x: number;
  y: number;
  w: number;
  h: number;
  class: string;
  confidence: number;
};

type ShapeData = {
  [time: string]: Shape[];
};

type TabData = {
  id: number;
  text: string;
  video: string;
  json: ShapeData;
};

function App() {
  const [selected, setSelected] = useState(0);
  const [tabData] = useState<TabData[]>([
    {
      id: 1,
      text: 'Video 1',
      video: video1,
      json: test1,
    },   
    {
      id: 2,
      text: 'Video 2',
      video: video2,
      json: test2,
    },   
  ]);

  return (
    <div className={`w-screen h-screen grid place-items-center pt-40 ${selected && 'p-10-20'}`}>
      <Navbar className={!selected ? '-translate-y-1/2 top-1/2' : '-translate-x-1/2 top-6 left-1/2'}>
        {tabData.map((tab, index) => (
          <NavbarButton key={tab.id} isSelected={selected == tab.id} onClick={() => setSelected(tab.id)} isLast={index == tabData.length - 1}>
            <h1>{tab.text}</h1>
            {!selected && <video
              className="mt-4"
            >
              <source src={tab.video} type="video/mp4" />
            </video>}
          </NavbarButton>
        ))}
      </Navbar>
      {!!selected && (
        <VideoPlayer
          key={selected}
          video={tabData.find(tab => tab.id == selected)?.video}
          shapeData={tabData.find(tab => tab.id == selected)?.json}
        />)}
    </div>
  )
}

export default App
