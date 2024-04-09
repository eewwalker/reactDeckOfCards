import { useEffect, useState } from "react";
import Card from "./Card";
import { v4 as uuid } from 'uuid';

const CARDS_API_URL = "https://deckofcardsapi.com/api/deck/";

/** Component that fetches deck of cards and renders Cards
 *
 * Props: none
 *
 * State:
 * -deckOfCards: []
 * -deckId:
 * -deckEmpty: boolean
 *
 * App -> Cards -> Card
 */

export default function Cards() {
    const [deckOfCards, setDeckOfCards] = useState([]);
    const [deckId, setDeckId] = useState('');
    const [deckEmpty, setDeckEmpty] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    // Makes request to cards API and gets new deck id
    useEffect(function fetchNewDeck() {
        async function getNewDeckId() {
            const response = await fetch(`${CARDS_API_URL}new/shuffle`);
            const responseData = await response.json();
            setDeckId(responseData.deck_id);
        }
        getNewDeckId();
    }, []);

    /** returns HTML for cards in card list */
    function renderCards() {
        return deckOfCards.map(card => <Card img={card.img} key={card.id} />);
    }

    /** Makes request to cards API and adds new card to deckOfCards */
    async function drawCard() {
        const response = await fetch(`${CARDS_API_URL}${deckId}/draw/?count=1`);
        const responseData = await response.json();

        if (responseData.remaining === 0) setDeckEmpty(true);

        const newCard = { id: uuid(), img: responseData.cards[0].image };
        setDeckOfCards(currDeck => [...currDeck, newCard]);
    }

    async function shuffleDeck() {
        setIsShuffling(true);
        await fetch(`${CARDS_API_URL}${deckId}/shuffle`);
        setDeckEmpty(false);
        setDeckOfCards([]);
    }

    useEffect(function () {
        if (isShuffling) setIsShuffling(false);
    }, [isShuffling]);

    if (!deckId) return <i>Loading...</i>;

    return (
        <div className="Cards">
            {isShuffling
                ? <button onClick={shuffleDeck} disabled>Shuffle Deck</button>
                : <button onClick={shuffleDeck} >Shuffle Deck</button>}
            {deckEmpty
                ? <h1>No cards remaining</h1>
                : <button onClick={drawCard}>GIMMIE A CARD!</button>}
            {renderCards()}
        </div>
    );
}
