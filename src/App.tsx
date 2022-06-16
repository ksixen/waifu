import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector } from './hooks/redux';

function App() {
  const [image, setImage] = useState<{url: string}[]>([])
  const {savedImages} = useAppSelector(store => store);
  const {currentCategory} = useAppSelector(store => store.category)
  
  axios.defaults.baseURL = "https://api.waifu.pics/";
  class API{
    getImages = async (setState: any) => {
      const req = await axios.get(currentCategory);
      setState((prev: any) => [...prev, req.data]); 
    }
  }
  const api = new API();
  useEffect(() => {
    if(image.length === 0){
      api.getImages(setImage)
    }
  }, [])

  return (
    <div className="app">
      <header className="app-wrapper">
        {image.map((data, index) => (
          <div className="image-block" key={index}>
            <div className="image-wrapper">
              <img className='image' src={data.url} alt={data.url} />
            </div>
          </div>
        ))}
        {/* <InfiniteScroll
          dataLength={image.length} 
          next={() => api.getImages(setImage)}
          onScroll={() => api.getImages(setImage)}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          pullDownToRefresh
          refreshFunction={() => {}}
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
          {image.map((data, index) => <img key={index} src={data.url} alt={data.url} />)}
        </InfiniteScroll> */}
      </header> 
    </div>
  );
}

export default App;