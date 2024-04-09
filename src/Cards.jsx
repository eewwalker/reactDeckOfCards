import { useEffect, useState } from "react";
import Card from "./Card";

const CARDS_API_URL = "https://deckofcardsapi.com/api/deck/";

/** Component that fetches deck of cards and renders Cards
 *
 * Props: none
 *
 * State:
 * -deckOfCards: []
 * -deckId:
 *
 * App -> Cards -> Card
 */

export default function Cards() {
    const [deckOfCards, setDeckOfCards] = useState([]);
    const [deckId, setDeckId] = useState('');

    useEffect(function fetchNewDeck() {
        async function getNewDeckId() {
            const response = await fetch(`${CARDS_API_URL}new/shuffle`);
            const responseData = await response.json();
            setDeckOfCards();
            setDeckId(responseData.deck_id);
        }
        getNewDeckId();
    }, []);

    function renderCards() {
        deckOfCards.map(card => <Card img={card.img} key={card.id} />);

    }

    if (!deckId) return <i>Loading...</i>;

    return (
        <div className="Cards">
            <button onClick={handleClick}>GIMMIE A CARD!</button>
            {renderCards()}

        </div>
    );
}