import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login'
import Register from './components/Register';
import Gallery from "./components/Gallery";
import CreateGallery from "./components/CreateGallery";
import EditGallery from "./components/EditGallery";
import ViewGallery from "./components/ViewGallery";
import NewPhoto from "./components/NewPhoto";
import EditPhoto from "./components/EditPhoto";
import ViewPhoto from "./components/ViewPhoto";
import NewComment from "./components/NewComment";
import EditComment from "./components/EditComment";
import NewGalleryTag from "./components/NewGalleryTag";
import EditGalleryTag from "./components/EditGalleryTag";
import NewPhotoTag from "./components/NewPhotoTag";
import EditPhotoTag from "./components/EditPhotoTag";
import ViewTag from "./components/ViewTag";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Gallery />} />
          <Route path="/galleries/new" element={<CreateGallery />} />
          <Route path="/galleries/:id/edit" element={<EditGallery />} />
          <Route path="/galleries/:id" element={<ViewGallery />} />
          <Route path="/galleries/:id/photos/new" element={<NewPhoto />} />
          <Route path="/galleries/:gallery_id/photos/:id/edit" element={<EditPhoto />} />
          <Route path="/photos/:id/comments" element={< ViewPhoto />} />
          <Route path="/photos/:id/comments/new" element={< NewComment />} />
          <Route path="/photos/:photo_id/comments/:id/edit" element={< EditComment />} />
          <Route path="galleries/:id/tags/new" element={< NewGalleryTag />} />
          <Route path="galleries/:gallery_id/tags/:id/edit" element={< EditGalleryTag />} />

          <Route path="photos/:id/tags/new" element={< NewPhotoTag />} />
          <Route path="photos/:gallery_id/tags/:id/edit" element={< EditPhotoTag />} />
          <Route path="/tags/:id" element={< ViewTag />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
