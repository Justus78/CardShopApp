import { useContext, useState } from 'react';
import { toast } from "react-toastify";
import SearchBar from '../Scryfall/SearchBar';
import SortingControls from '../Scryfall/SortingControls';
import CardGrid from '../Scryfall/CardGrid';
import LoadingOverlay from "../../Components/LoadingSpinners/LoadingOverlay"

import {
  ProductCategory,
  CardCondition,
  CardRarity,
  CardType,
} from "../../Constants/enums";
 
import {
  handleScryfallSearch,
  filterCards,
  groupCards,
  paginateGroups,
  buildProductFormData,
  buildTradeInFormData
} from "../../Helpers/ScryfallHelper";

import { DataContext } from '../../Context/DataContext';
import CardUserModal from '../Scryfall/User/CardUserModal';
import { addItemToDraft } from '../../Services/TradeInService';
import { useNavigate } from 'react-router-dom';

const pageSize = 20;

const ScryfallSearch = () => {
  const [query, setQuery] = useState("");

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedCard, setSelectedCard] = useState(null);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("");

  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [sortOrder, setSortOrder] = useState("name");
  const [groupBy, setGroupBy] = useState("");

  const [tradeIn, setTradeIn] = useState([]);
  const [tradeInItem, setTradeInItem] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);   
  const navigate = useNavigate();
      
  const PAGE_SIZE = 20; // set page size
  
  const { user } = useContext(DataContext);

    // 🔍 Search handler
  const handleSearch = async (e) => {
    e.preventDefault();

    handleScryfallSearch(query, {
        setLoading,
        setError,
        setCards,
        setCurrentPage
    });
  };
  
  // 🎴 Filter, group, and paginate cards using helpers
  const filteredCards = filterCards(cards, selectedRarity, selectedType, sortOrder);
  const groupedCards = groupCards(filteredCards, groupBy);
  const paginatedGroupedCards = paginateGroups(groupedCards, currentPage, PAGE_SIZE);

  const totalCardsCount = filteredCards.length;
  const totalPages = Math.ceil(totalCardsCount / PAGE_SIZE);
    
    // 🧱 Open modal and reset form fields
  const handleAddClick = (card) => {
    setSelectedCard(card);
    setPrice("");
    setSelectedCondition("");
    setSelectedRarity("");
    setSelectedType("");
  };

  const handleAddClickUser = () => {

  }

  const handleSubmit = async () => {
    // add the selected card to the trade in draft

    // validate the form inputs
    if (!quantity || quantity <= 0) {
        toast.error("Please enter a valid quantity.");
        return;
    }
    if (!selectedCondition) {
        toast.error("Please select a card condition.");
        return;
    }
    if (!selectedFinish) {
        toast.error("Please select foil or non-foil.");
        return;
    }
    try {
        setLoading(true);
        // create the form data
        const formData = buildTradeInFormData(
            selectedCard,
            quantity,
            selectedCondition,
        );  

        // call the api that adds the trade in item
        const tradeIn = await addItemToDraft(formData);
        setTradeIn(tradeIn);
        toast.success(`Added ${selectedCard.name} to your trade in.`)

    } catch (err) { // catch errors
        console.error(err);
        toast.error("Failed to add card to trade in.");
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className='mt-40'>
        
        <button      
            onClick={() => navigate("/userTrade")}       
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
        >
            Back To Dashboard
        </button>
        <SearchBar 
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
        />

           {/* 🔽 Sorting / Grouping */}
        <SortingControls
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
        />

         {/* Loading & Errors */}
        {loading && 
            <LoadingOverlay />
        }
        {error && <p className="text-center text-red-400 font-medium mb-6">{error}</p>}  

        {/* 🎴 Cards */}
        <CardGrid
            paginatedGroupedCards={paginatedGroupedCards}
            handleAddClick={handleAddClick} // need to finish method and hook it into the cards
            handleAddClickUser={handleAddClickUser}
        />

        {/* 🔄 Pagination */}
        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={`px-4 py-2 rounded-xl ${
                currentPage === 1
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105"
                } transition-all`}
            >
                Previous
            </button>

            <span className="text-gray-300">
                Page {currentPage} of {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className={`px-4 py-2 rounded-xl ${
                currentPage === totalPages
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105"
                } transition-all`}
            >
                Next
            </button>
            </div>
        )}

        {selectedCard && (
            <CardUserModal 
                card={selectedCard}
                onClose={() => setSelectedCard(null)}
                onSubmit={handleSubmit}
                quantity={quantity}
                setQuantity={setQuantity}
                selectedFinish={selectedFinish}
                setSelectedFinish={setSelectedFinish}
                selectedCondition={selectedCondition}
                setSelectedCondition={setSelectedCondition}
            />
        )}

    </div>
)
}

export default ScryfallSearch