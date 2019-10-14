import React from "react";
import axios from "axios";
import converter from "./converter.css";


class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "USD",
      toCurrency: "EUR",
      amount: 1,
      currencies: []
    };
  }

  componentDidMount() {
    axios
      .get("https://rapidapi.com/fyhao/api/currency-exchange")
      .then(response => {
        const currencyAr = ["EUR", "USD"];
        for (const key in response.data.params) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr });
      })
      .catch(err => {
        console.log("inch vor sxal ka...", err);
      });
  }
  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
/*  axios.get("https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=SGD&to=MYR", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
		"x-rapidapi-key": "b16394cecdmshbbc373eacd85925p117c80jsnd39abf075d10"
	}
})*/
      axios.get(`https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=SGD&to=MYR,${
            this.state.fromCurrency
          }&symbols=${this.state.toCurrency}`
        )
        .then(res => {
          const result =
            this.state.amount * res.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
        })
        .catch(error => {
          console.log("Sxal", error.message);
        });
    } else {
      this.setState({ result: "Nuyn arjuytov poxanakum hnaravor che!" });
    }
  };
  selectHandler = event => {
    if (event.target.name === "Currency_from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "Currency_to") {
        this.setState({ toCurrency: event.target.value });
      }
    }
  };
  render() {
    return (
      <div className="Converter">
        <h2>
          <span>Currency</span>Converter
          <span role="img" aria-label="money">
            &#x1f4b5;
          </span>
        </h2>
        <div className="From">
          <input
            name="amount"
            type="text"
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
          />
          <select
            name="Currency_from"
            onChange={event => this.selectHandler(event)}
            value={this.state.fromCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          <select
            name="Currency_to"
            onChange={this.convertHandler}
            value={this.state.toCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          {this.state.result && <h3>{this.state.result}</h3>}
        </div>
      </div>
    );
  }
}
export default Converter;