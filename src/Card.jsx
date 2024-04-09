
/** Displays a card
 *
 * State: none
 * Props: img
 */
export default function Card({ img }) {
    return (
        <div className="Card">
            <img src={img} alt="playing card" />
        </div>
    );
}