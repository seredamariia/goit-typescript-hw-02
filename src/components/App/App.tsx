import { getImagesUnplash } from "../../unsplash";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import LoaderMore from "../Loader/LoaderMore";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "./App.types";

interface ImageData {
  total_pages: number;
  total: number;
  results: Image[];
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleSearch = async (searchQuery: string): Promise<void> => {
    try {
      setLoading(true);
      setIsSearching(true);
      setImages([]);
      setPage(1);
      setSearch(searchQuery);
      const dataImg: ImageData | undefined = await getImagesUnplash(
        searchQuery,
        1
      );
      console.log(dataImg);
      if (!dataImg) {
        throw new Error("No data received from the API request");
      }
      setTotalPages(dataImg.total_pages);
      setImages(dataImg.results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleLoadMore = async (): Promise<void> => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const dataImages: ImageData | undefined = await getImagesUnplash(
        search,
        nextPage
      );

      setImages((prevImages: Image[]): Image[] => {
        if (!dataImages) {
          throw new Error("No data received from the API request");
        }
        return [...prevImages, ...dataImages.results];
      });
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const isVisible = (): boolean => {
    return totalPages !== 0 && totalPages !== page && !loadingMore;
  };

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const closeModal = (): void => setModalIsOpen(false);
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery imageList={images} openModal={openModal} />
      {!loadingMore && !isSearching && (
        <LoadMoreBtn onClick={handleLoadMore} isVisible={isVisible} />
      )}
      {loadingMore && <LoaderMore />}
      <ImageModal
        isOpen={modalIsOpen}
        image={selectedImage}
        onCloseModal={closeModal}
      />
    </>
  );
}

export default App;
