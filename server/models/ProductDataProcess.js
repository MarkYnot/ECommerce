const { json } = require("express");
const e = require("express");
module.exports.sortRating = function(sell){
    let rank_result = [];
    for(let i = 0; i < sell.length; i++){
        let totalMark = 0;
        for(let j = 0; j < sell[i].reviews.length; j++){
            totalMark += sell[i].reviews[j].rating
        }
        let avg_rating = (totalMark/sell[i].reviews.length).toFixed(2);
        let jsonObj = {
            sell: sell[i],
            avg_rate: avg_rating
        }
        if(rank_result.length == 0){
            rank_result.push(jsonObj);
        }else if(rank_result.length == 1){
            if (avg_rating < rank_result[0].avg_rate){
                rank_result.push(jsonObj);
            }else{
                rank_result.splice(0,0,jsonObj);
            }
        }else{
            for(let q = 0; q < rank_result.length; q++){
                if(avg_rating == rank_result[q].avg_rate){
                    rank_result.splice(q,0,jsonObj);
                    break;
                }else if(avg_rating > rank_result[q].avg_rate){
                    rank_result.splice(q,0,jsonObj);
                    break;
                }else{
                    if(q == rank_result.length-1){
                        rank_result.push(jsonObj);
                        break;
                    }
                }
            }
        }
    }

    return rank_result
}
 