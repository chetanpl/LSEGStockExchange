import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatBotExchange from "./component/ChatBotExchange";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const mockStockData = [
  {
    code: "NYSE",
    stockExchange: "New York Stock Exchange",
    topStocks: [
      { code: "AAPL", stockName: "Apple Inc.", price: 150 },
      { code: "GOOGL", stockName: "Alphabet Inc.", price: 2800 },
    ],
  },
  {
    code: "NASDAQ",
    stockExchange: "NASDAQ",
    topStocks: [
      { code: "TSLA", stockName: "Tesla Inc.", price: 700 },
    ],
  },
];

describe("ChatBotExchange Component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders the component and shows loading state", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockStockData));

    render(<ChatBotExchange />);

    expect(screen.getByText(/LSEG Chatbot/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Please select a Stock Exchange:")).toBeInTheDocument();
    });
  });

  test("displays stock exchanges and allows selection", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockStockData));

    render(<ChatBotExchange />);
    await waitFor(() => {
      expect(screen.getByText("Please select a Stock Exchange:")).toBeInTheDocument();
    });

    // Click on NYSE
    fireEvent.click(screen.getByText("New York Stock Exchange"));

    await waitFor(() => {
      expect(screen.getByText("Please select a stock:")).toBeInTheDocument();
      expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
      expect(screen.getByText("Alphabet Inc.")).toBeInTheDocument();
    });
  });

  test("displays stock options and allows selection", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockStockData));

    render(<ChatBotExchange />);
    await waitFor(() => {
      expect(screen.getByText("Please select a Stock Exchange:")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("New York Stock Exchange"));

    await waitFor(() => {
      expect(screen.getByText("Please select a stock:")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Apple Inc."));

    await waitFor(() => {
      expect(screen.getByText("Stock Price of Apple Inc. is $150")).toBeInTheDocument();
    });
  });

  test("allows navigating back to exchange selection", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockStockData));

    render(<ChatBotExchange />);
    await waitFor(() => {
      expect(screen.getByText("Please select a Stock Exchange:")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("NASDAQ"));

    await waitFor(() => {
      expect(screen.getByText("Please select a stock:")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Tesla Inc."));

    await waitFor(() => {
      expect(screen.getByText("Stock Price of Tesla Inc. is $700")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Go Back"));

    await waitFor(() => {
      expect(screen.getByText("Please select a stock:")).toBeInTheDocument();
    });
  });

  test("resets to home when clicking 'Main Menu'", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockStockData));

    render(<ChatBotExchange />);
    await waitFor(() => {
      expect(screen.getByText("Please select a Stock Exchange:")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("NASDAQ"));

    await waitFor(() => {
      expect(screen.getByText("Please select a stock:")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Tesla Inc."));

    await waitFor(() => {
      expect(screen.getByText("Stock Price of Tesla Inc. is $700")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Main Menu"));

    await waitFor(() => {
      expect(screen.getByText("Please select a Stock Exchange:")).toBeInTheDocument();
    });
  });

  test("displays error message when fetch fails", async () => {
    fetch.mockReject(new Error("Failed to fetch"));

    render(<ChatBotExchange />);

    await waitFor(() => {
      expect(screen.getByText("The backend service is down and data is not available at the moment")).toBeInTheDocument();
    });
  });
});
