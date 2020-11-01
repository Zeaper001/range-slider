import "./style.css";
import {prices, yearPrices} from './store.js';

class PriceSelector {

    constructor(element) {

        this.element = element;
        this.priceControls = this.element.querySelectorAll('.Price--Selector__price-controls li');
        this.periodControls = this.element.querySelectorAll('.Price--Selector__subscription-period li');
        this.subscription = this.element.querySelector('.Price--Selector__subscription-price');

        this.PAYMENT_PERIODS = {
            monthly: prices,
            yearly: yearPrices
        };

        this.state = {
            paymentPeriod: 'monthly',
            selectedPrice: 'priceRange1',
            set price(val) {
                this.selectedPrice = val;
                this.stateListener(val);
            },
            get price() {
                return this.selectedPrice;
            },
            set period(val) {
                this.paymentPeriod = val;
                this.stateListener(val);
            },
            get period() {
                return this.paymentPeriod;
            },
            stateListener: function(val) {},
            registerListener: function(listener) {
                this.stateListener = listener;
            }
        };

        this.bindEvents();
        this.setPrice();
    }

    bindEvents() {
        this.priceControls.forEach((item) => {
            item.addEventListener('click', () => {
                this.state.price = item.dataset.priceRange;
            })
        });

        this.periodControls.forEach((item) => {
            item.addEventListener('click', () => {
                this.state.period = item.dataset.periodRange;
            })
        });


        this.state.registerListener(() => {
            console.log(this.state)
            this.setPrice();
        })
    }

    setPrice() {
        this.subscription.innerHTML = this.PAYMENT_PERIODS[this.state.paymentPeriod][this.state.price].standard;
    }
}


const wrapper = document.querySelector('.Price--Selector');

new PriceSelector(wrapper);