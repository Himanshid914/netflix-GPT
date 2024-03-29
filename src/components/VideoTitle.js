const VideoTitle = ({title, overview}) => {
   return <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
     <h1 className="text-6xl font-bold">{title}</h1>
     <p className="text-lg w-1/4 py-6">{overview}</p>
     <div>
        <button className="bg-white text-black p-4 px-12 mx-2 text-xl hover:bg-opacity-80  rounded-lg"> ▶ Play</button>
        <button className="bg-white text-black p-4 px-12 mx-2 text-xl hover:bg-opacity-80 rounded-lg">More Info</button>
     </div>
   </div>
}; 
export default VideoTitle;