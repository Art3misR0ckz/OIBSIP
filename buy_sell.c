int maxProfit(int* prices, int pricesSize) {
    int sell=0;
    int buy=prices[0];
    for (int i=0;i<pricesSize;i++){
        
        if (prices[i]<buy){
            buy=prices[i];
        }
        if (prices[i]>sell){
            sell=prices[i];
        }

    }
    printf("%d", sell-buy);
}