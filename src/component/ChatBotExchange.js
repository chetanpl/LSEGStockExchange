import React, { useEffect, useState } from "react";
import logo from '../media/logo.png'
import { Button, Container, Header, ItemSelectionContainer, ItemsTitle, Logo, Result, ResultContainer, Title } from "./ChatBot.Styled.component";
import obj from './../db/data.json'
const ChatBotExchange = () => {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedStockResult, setSelectedStockResult] = useState(null);
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
        let formattedData = [];
        for (let exchage of obj) {
         let stockExchange = {
            name: exchage.stockExchange,
            stocks: exchage.topStocks.map(stock => ({
              code: stock.code,
              name: stock.stockName,
              price: stock.price,
            })),
          }
          formattedData.push(stockExchange);
        }
        setStockData(formattedData);
      }, []);

  const handleExchangeSelection = (exchange) => {
    setSelectedExchange(exchange);
    setSelectedStock(null);
    setSelectedStockResult(stockData[exchange].name);
  };

  const handleStockSelection = (stock) => {
    setSelectedStock(stock);
    setSelectedStockResult(stock.name);
  };

  const handleResetToHome = () => {
    setSelectedExchange(null);
    setSelectedStockResult(null);

  };

  const handleGoBack = () => {
    setSelectedStock(null);
    setSelectedStockResult(null);

  };

  return (
    <>
      <Header>
        <Logo alt="logo" src={logo} />
        <Title>LSEG Chatbot</Title>
      </Header>
      <Container>
        <ItemSelectionContainer>
          {!selectedExchange ? (
            <div>
              <ItemsTitle>{stockData != null && Object.keys(stockData).length > 0 ? <>Please select a Stock Exchange:</> : <>The backend service is down and data is not available at the moment</>}</ItemsTitle>
              {stockData != null && Object.keys(stockData).map((exchange) => {
                return (
                  <Button key={exchange} bg="#2563eb" onClick={() => handleExchangeSelection(exchange)}>
                    {stockData[exchange].name}
                  </Button>
                )
              })}
            </div>
          ) : !selectedStock ? (
            <div>
              <ItemsTitle>{stockData[selectedExchange]?.stocks?.length > 0 ? <>Please select a stock:</> : <>The backend service is down and data is not available at the moment</>}</ItemsTitle>
              {stockData[selectedExchange]?.stocks?.map((stock) => (
                <Button key={stock.code} onClick={() => handleStockSelection(stock)}>
                  {stock.name}
                </Button>
              ))}

              <Button bg="#ef4444" onClick={handleResetToHome}>Back to Home</Button>
            </div>
          ) : (
            <div>
              <ItemsTitle>Stock Price of {selectedStock.name} is ${selectedStock.price}</ItemsTitle>
              <Button onClick={handleGoBack}>Go Back</Button>
              <Button bg="#ef4444" onClick={handleResetToHome}>Main Menu</Button>
            </div>
          )}
        </ItemSelectionContainer>
        {selectedStockResult && (
          <ResultContainer>
            <Result>{selectedStockResult}</Result>
          </ResultContainer>
        )}
      </Container>
    </>
  );
};

export default ChatBotExchange;
