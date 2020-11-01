import "./style.css";
import PriceSelector from './PriceSelector';

const priceSelectors = []

const wrapper = document.querySelectorAll('.Price--Selector');

for (var i = 0; i < wrapper.length; i++) {
    priceSelectors.push(new PriceSelector(wrapper[i]));
}
