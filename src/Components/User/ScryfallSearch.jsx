import { useContext, useState } from 'react';
import { toast } from "react-toastify";
import SearchBar from '../Scryfall/SearchBar';
import SortingControls from '../Scryfall/SortingControls';
import CardGrid from '../Scryfall/CardGrid';

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
  buildProductFormData
} from "../../Helpers/ScryfallHelper";

import { DataContext } from '../../Context/DataContext';

const pageSize = 20;
/*
  public class TradeInItemCreateDto
  {
      public string CardName { get; set; } = string.Empty;
      public string SetCode { get; set; } = string.Empty;
      public int Quantity { get; set; }
      public CardCondition Condition { get; set; } = CardCondition.NearMint;
      public decimal? EstimatedPrice { get; set; } // per unit from Scryfall
  }

  public class TradeInDto
  {
      public int Id { get; set; }
      public TradeInStatus Status { get; set; } = TradeInStatus.Submitted;
      public decimal? EstimatedValue { get; set; }
      public DateTime SubmittedAt { get; set; } = DateTime.Now;
  }
*/


// need to create a trade in service for trade ins
// variable to hold a trade in item
// object to hold all trade in items



const ScryfallSearch = () => {
  const [query, setQuery] = useState("");

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedCard, setSelectedCard] = useState(null);
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");

  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [sortOrder, setSortOrder] = useState("name");
  const [groupBy, setGroupBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);   
      
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
    setInventory("");
    setSelectedCondition("");
    setSelectedRarity("");
    setSelectedType("");
  };



  return (
    <>
        <SearchBar />
    </>
)
}

export default ScryfallSearch