import React, { Component } from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import { scroller, Element } from 'react-scroll';
import EnrichmentsSidebar from './EnrichmentsSidebar';
import NoResults from '../../views/NoResults/NoResults';
import ShowMoreResults from '../../views/ShowMoreResults/ShowMoreResults';
import ResultContainer from '../ResultContainer/ResultContainer';
import replaceNewlines from '../../utils/replaceNewlines';
import './styles.css';
import '../../__test__/containers/EnrichmentsContainer/aggregations_mock.json'

class EnrichmentsContainer extends Component {
  static getKey(regularResult, enrichedResult) {
    if (regularResult && enrichedResult) {
      return regularResult.id + enrichedResult.id;
    } else if (regularResult) {
      return regularResult.id;
    } else if (enrichedResult) {
      return enrichedResult.id;
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      totalResultsShown: 3,
    };
  }

  componentDidMount() {
    scroller.scrollTo('scroll_to_results', {
      smooth: true,
      offset: -this.props.searchContainerHeight,
    });
  }

  getEnrichedResultWithOriginalRank(rank) {
    const { regularResults, enrichedResults } = this.props;
    const enrichedResult = enrichedResults.results[rank];
    const enrichedResultId = enrichedResult.id;
    const originalIndex = regularResults.results.findIndex(result => result.id === enrichedResultId);

    return Object.assign({}, enrichedResult, {
      originalRank: originalIndex + 1,
    });
  }

  hasMoreResults() {
    const { regularResults, enrichedResults, maxRegularResults } = this.props;
    const totalResultsShown = this.state.totalResultsShown;
    const totalRegularResults = Math.min(regularResults.results.length, maxRegularResults);

    return totalRegularResults > totalResultsShown ||
           enrichedResults.results.length > totalResultsShown;
  }

  handleMoreResults = () => {
    this.setState({ totalResultsShown: this.state.totalResultsShown + 1 });
  }

  render() {
    const { regularResults, enrichedResults, maxRegularResults } = this.props;
    const { totalResultsShown } = this.state;
const maxResults = Math.max(maxRegularResults, enrichedResults.results.length);

const aggregations = [
  {
        "type": "term",
        "field": "enriched_text.keywords.text",
        "count": 100,
        "results": [
          {
            "key": "company",
            "matching_results": 357040
          },
          {
            "key": "shares",
            "matching_results": 346871
          },
          {
            "key": "people",
            "matching_results": 276715
          },
          {
            "key": "quarter",
            "matching_results": 256746
          },
          {
            "key": "stock",
            "matching_results": 246772
          },
          {
            "key": "United States",
            "matching_results": 229182
          },
          {
            "key": "average price",
            "matching_results": 228828
          },
          {
            "key": "time",
            "matching_results": 227867
          },
          {
            "key": "hold rating",
            "matching_results": 220190
          },
          {
            "key": "rating",
            "matching_results": 192973
          },
          {
            "key": "Zacks Investment Research",
            "matching_results": 186336
          },
          {
            "key": "buy rating",
            "matching_results": 173458
          },
          {
            "key": "percent",
            "matching_results": 150151
          },
          {
            "key": "Friday",
            "matching_results": 145011
          },
          {
            "key": "sell rating",
            "matching_results": 140028
          },
          {
            "key": "Thursday",
            "matching_results": 134047
          },
          {
            "key": "institutional investors",
            "matching_results": 133053
          },
          {
            "key": "research report",
            "matching_results": 129371
          },
          {
            "key": "Aug",
            "matching_results": 128570
          },
          {
            "key": "Wednesday",
            "matching_results": 128112
          },
          {
            "key": "Monday",
            "matching_results": 126769
          },
          {
            "key": "Tuesday",
            "matching_results": 122784
          },
          {
            "key": "research note",
            "matching_results": 120238
          },
          {
            "key": "market capitalization",
            "matching_results": 118424
          },
          {
            "key": "net margin",
            "matching_results": 118297
          },
          {
            "key": "price target",
            "matching_results": 118255
          },
          {
            "key": "average rating",
            "matching_results": 116981
          },
          {
            "key": "Exchange Commission",
            "matching_results": 113223
          },
          {
            "key": "consensus rating",
            "matching_results": 111005
          },
          {
            "key": "market cap",
            "matching_results": 104738
          },
          {
            "key": "target price",
            "matching_results": 104391
          },
          {
            "key": "consensus estimate",
            "matching_results": 103268
          },
          {
            "key": "hedge funds",
            "matching_results": 100562
          },
          {
            "key": "President Donald Trump",
            "matching_results": 100429
          },
          {
            "key": "equities research analysts",
            "matching_results": 100291
          },
          {
            "key": "quarterly dividend",
            "matching_results": 97273
          },
          {
            "key": "information",
            "matching_results": 94720
          },
          {
            "key": "way",
            "matching_results": 94059
          },
          {
            "key": "Reuters",
            "matching_results": 91993
          },
          {
            "key": "world",
            "matching_results": 91975
          },
          {
            "key": "company stock",
            "matching_results": 91640
          },
          {
            "key": "New York",
            "matching_results": 89969
          },
          {
            "key": "country",
            "matching_results": 89412
          },
          {
            "key": "forward-looking statements",
            "matching_results": 85230
          },
          {
            "key": "report",
            "matching_results": 83031
          },
          {
            "key": "number",
            "matching_results": 82006
          },
          {
            "key": "North America",
            "matching_results": 81902
          },
          {
            "key": "Aug.",
            "matching_results": 81684
          },
          {
            "key": "quarterly earnings results",
            "matching_results": 81329
          },
          {
            "key": "concise daily summary",
            "matching_results": 80083
          },
          {
            "key": "quarterly earnings data",
            "matching_results": 79300
          },
          {
            "key": "business",
            "matching_results": 77610
          },
          {
            "key": "Advertisement",
            "matching_results": 77028
          },
          {
            "key": "Associated Press",
            "matching_results": 76661
          },
          {
            "key": "new stake",
            "matching_results": 76559
          },
          {
            "key": "social media",
            "matching_results": 75883
          },
          {
            "key": "customers",
            "matching_results": 74779
          },
          {
            "key": "place",
            "matching_results": 73303
          },
          {
            "key": "Sep",
            "matching_results": 73242
          },
          {
            "key": "total value",
            "matching_results": 71895
          },
          {
            "key": "new position",
            "matching_results": 71528
          },
          {
            "key": "earnings results",
            "matching_results": 70858
          },
          {
            "key": "press release",
            "matching_results": 70493
          },
          {
            "key": "money",
            "matching_results": 67833
          },
          {
            "key": "Inc.",
            "matching_results": 67143
          },
          {
            "key": "things",
            "matching_results": 67065
          },
          {
            "key": "strong buy rating",
            "matching_results": 65515
          },
          {
            "key": "Saturday",
            "matching_results": 65209
          },
          {
            "key": "dividend payout ratio",
            "matching_results": 65184
          },
          {
            "key": "period",
            "matching_results": 65101
          },
          {
            "key": "cent",
            "matching_results": 65097
          },
          {
            "key": "total transaction",
            "matching_results": 64722
          },
          {
            "key": "dividend yield",
            "matching_results": 64296
          },
          {
            "key": "ex-dividend date",
            "matching_results": 64144
          },
          {
            "key": "consensus target price",
            "matching_results": 63044
          },
          {
            "key": "consensus price target",
            "matching_results": 62155
          },
          {
            "key": "Jefferies Group LLC",
            "matching_results": 61713
          },
          {
            "key": "share",
            "matching_results": 61431
          },
          {
            "key": "PM",
            "matching_results": 61369
          },
          {
            "key": "stake",
            "matching_results": 61065
          },
          {
            "key": "companies",
            "matching_results": 59049
          },
          {
            "key": "average target price",
            "matching_results": 58665
          },
          {
            "key": "AP",
            "matching_results": 58431
          },
          {
            "key": "average price target",
            "matching_results": 58273
          },
          {
            "key": "team",
            "matching_results": 58166
          },
          {
            "key": "original version",
            "matching_results": 58058
          },
          {
            "key": "Sunday",
            "matching_results": 57849
          },
          {
            "key": "email address",
            "matching_results": 57814
          },
          {
            "key": "P/E ratio",
            "matching_results": 56868
          },
          {
            "key": "end",
            "matching_results": 56802
          },
          {
            "key": "work",
            "matching_results": 56721
          },
          {
            "key": "research analysts",
            "matching_results": 56470
          },
          {
            "key": "statement",
            "matching_results": 56112
          },
          {
            "key": "Sept.",
            "matching_results": 55626
          },
          {
            "key": "trading volume",
            "matching_results": 55451
          },
          {
            "key": "NYSE",
            "matching_results": 55181
          },
          {
            "key": "Facebook",
            "matching_results": 54744
          },
          {
            "key": "Share",
            "matching_results": 54169
          },
          {
            "key": "project",
            "matching_results": 52619
          },
          {
            "key": "Twitter",
            "matching_results": 50988
          }
        ]
      },
      {
        "type": "term",
        "field": "enriched_text.sentiment.document.label",
        "count": 3,
        "results": [
          {
            "key": "positive",
            "matching_results": 2841187
          },
          {
            "key": "negative",
            "matching_results": 1633542
          },
          {
            "key": "neutral",
            "matching_results": 362964
          }
        ]
      },
      {
        "type": "term",
        "field": "enriched_text.concepts.text",
        "count": 100,
        "results": [
          {
            "key": "Stock market",
            "matching_results": 529933
          },
          {
            "key": "Stock",
            "matching_results": 519045
          },
          {
            "key": "United States",
            "matching_results": 458042
          },
          {
            "key": "Share",
            "matching_results": 303455
          },
          {
            "key": "Average",
            "matching_results": 284154
          },
          {
            "key": "Marketing",
            "matching_results": 261241
          },
          {
            "key": "Investment",
            "matching_results": 255516
          },
          {
            "key": "Finance",
            "matching_results": 232778
          },
          {
            "key": "English-language films",
            "matching_results": 216350
          },
          {
            "key": "Revenue",
            "matching_results": 213457
          },
          {
            "key": "The Quarter at Tropicana",
            "matching_results": 210311
          },
          {
            "key": "Financial services",
            "matching_results": 206414
          },
          {
            "key": "Management",
            "matching_results": 202643
          },
          {
            "key": "Economics",
            "matching_results": 181671
          },
          {
            "key": "Petroleum",
            "matching_results": 171481
          },
          {
            "key": "Corporation",
            "matching_results": 152748
          },
          {
            "key": "United Kingdom",
            "matching_results": 145069
          },
          {
            "key": "Shareholder",
            "matching_results": 144960
          },
          {
            "key": "2016",
            "matching_results": 141348
          },
          {
            "key": "President of the United States",
            "matching_results": 137274
          },
          {
            "key": "Donald Trump",
            "matching_results": 118151
          },
          {
            "key": "Business",
            "matching_results": 113793
          },
          {
            "key": "P/E ratio",
            "matching_results": 112376
          },
          {
            "key": "New York City",
            "matching_results": 109215
          },
          {
            "key": "Copyright",
            "matching_results": 108085
          },
          {
            "key": "U.S. state",
            "matching_results": 107751
          },
          {
            "key": "Dividend yield",
            "matching_results": 105298
          },
          {
            "key": "Week-day names",
            "matching_results": 97851
          },
          {
            "key": "Bond",
            "matching_results": 95278
          },
          {
            "key": "European Union",
            "matching_results": 94508
          },
          {
            "key": "Real estate",
            "matching_results": 89793
          },
          {
            "key": "Natural gas",
            "matching_results": 87910
          },
          {
            "key": "Chief executive officer",
            "matching_results": 87615
          },
          {
            "key": "Fiscal year",
            "matching_results": 86299
          },
          {
            "key": "Security",
            "matching_results": 85011
          },
          {
            "key": "Generally Accepted Accounting Principles",
            "matching_results": 84922
          },
          {
            "key": "Associated Press",
            "matching_results": 84731
          },
          {
            "key": "Bank",
            "matching_results": 83521
          },
          {
            "key": "Federal government of the United States",
            "matching_results": 81227
          },
          {
            "key": "United States dollar",
            "matching_results": 80285
          },
          {
            "key": "Money",
            "matching_results": 78131
          },
          {
            "key": "All rights reserved",
            "matching_results": 77502
          },
          {
            "key": "Democratic Party",
            "matching_results": 77135
          },
          {
            "key": "Stock exchange",
            "matching_results": 76962
          },
          {
            "key": "Dividend",
            "matching_results": 76187
          },
          {
            "key": "Dividend payout ratio",
            "matching_results": 76103
          },
          {
            "key": "International trade",
            "matching_results": 75962
          },
          {
            "key": "Board of directors",
            "matching_results": 75509
          },
          {
            "key": "Water",
            "matching_results": 73965
          },
          {
            "key": "Company",
            "matching_results": 73373
          },
          {
            "key": "Trade",
            "matching_results": 73238
          },
          {
            "key": "Debt",
            "matching_results": 71844
          },
          {
            "key": "U.S. Securities and Exchange Commission",
            "matching_results": 70217
          },
          {
            "key": "Medicine",
            "matching_results": 69039
          },
          {
            "key": "Automobile",
            "matching_results": 69001
          },
          {
            "key": "Sales",
            "matching_results": 67136
          },
          {
            "key": "Monday",
            "matching_results": 67096
          },
          {
            "key": "Income",
            "matching_results": 66647
          },
          {
            "key": "Manufacturing",
            "matching_results": 65329
          },
          {
            "key": "Hedge fund",
            "matching_results": 65255
          },
          {
            "key": "Employment",
            "matching_results": 65107
          },
          {
            "key": "Europe",
            "matching_results": 64992
          },
          {
            "key": "Corporate governance",
            "matching_results": 63956
          },
          {
            "key": "According to Jim",
            "matching_results": 62474
          },
          {
            "key": "2017",
            "matching_results": 62024
          },
          {
            "key": "Bill Clinton",
            "matching_results": 61924
          },
          {
            "key": "Government",
            "matching_results": 61859
          },
          {
            "key": "Ivana Trump",
            "matching_results": 61646
          },
          {
            "key": "World War II",
            "matching_results": 61629
          },
          {
            "key": "Moving average",
            "matching_results": 61609
          },
          {
            "key": "American football",
            "matching_results": 60511
          },
          {
            "key": "George W. Bush",
            "matching_results": 60350
          },
          {
            "key": "Time",
            "matching_results": 60127
          },
          {
            "key": "Russia",
            "matching_results": 59662
          },
          {
            "key": "Supply and demand",
            "matching_results": 59553
          },
          {
            "key": "Texas",
            "matching_results": 59018
          },
          {
            "key": "Advertising",
            "matching_results": 58318
          },
          {
            "key": "Price",
            "matching_results": 57918
          },
          {
            "key": "Property",
            "matching_results": 57600
          },
          {
            "key": "State",
            "matching_results": 57251
          },
          {
            "key": "Executive officer",
            "matching_results": 57248
          },
          {
            "key": "Capitalism",
            "matching_results": 57207
          },
          {
            "key": "California",
            "matching_results": 57141
          },
          {
            "key": "Japan",
            "matching_results": 57111
          },
          {
            "key": "Abbas Kiarostami",
            "matching_results": 57094
          },
          {
            "key": "North America",
            "matching_results": 57055
          },
          {
            "key": "Tropical cyclone",
            "matching_results": 56956
          },
          {
            "key": "Strategic management",
            "matching_results": 56672
          },
          {
            "key": "Law",
            "matching_results": 56362
          },
          {
            "key": "Customer service",
            "matching_results": 56308
          },
          {
            "key": "Dividends",
            "matching_results": 56193
          },
          {
            "key": "Want",
            "matching_results": 56008
          },
          {
            "key": "Fred Trump",
            "matching_results": 55632
          },
          {
            "key": "Management occupations",
            "matching_results": 55616
          },
          {
            "key": "Washington, D.C.",
            "matching_results": 55194
          },
          {
            "key": "United Arab Emirates",
            "matching_results": 55159
          },
          {
            "key": "Canada",
            "matching_results": 54875
          },
          {
            "key": "Insurance",
            "matching_results": 54759
          },
          {
            "key": "Sun",
            "matching_results": 54745
          },
          {
            "key": "Tax",
            "matching_results": 54660
          }
        ]
      },
      {
        "type": "term",
        "field": "enriched_text.entities.text",
        "count": 100,
        "results": [
          {
            "key": "U.S.",
            "matching_results": 381592
          },
          {
            "key": "United States",
            "matching_results": 355812
          },
          {
            "key": "Reuters",
            "matching_results": 282975
          },
          {
            "key": "US",
            "matching_results": 266169
          },
          {
            "key": "CEO",
            "matching_results": 264947
          },
          {
            "key": "NYSE",
            "matching_results": 246017
          },
          {
            "key": "China",
            "matching_results": 237162
          },
          {
            "key": "Facebook",
            "matching_results": 233802
          },
          {
            "key": "Europe",
            "matching_results": 230091
          },
          {
            "key": "analyst",
            "matching_results": 199587
          },
          {
            "key": "Twitter",
            "matching_results": 195912
          },
          {
            "key": "director",
            "matching_results": 185419
          },
          {
            "key": "India",
            "matching_results": 177536
          },
          {
            "key": "UK",
            "matching_results": 161577
          },
          {
            "key": "New York",
            "matching_results": 159208
          },
          {
            "key": "president",
            "matching_results": 158807
          },
          {
            "key": "North America",
            "matching_results": 154458
          },
          {
            "key": "Canada",
            "matching_results": 153471
          },
          {
            "key": "partner",
            "matching_results": 149913
          },
          {
            "key": "Texas",
            "matching_results": 148841
          },
          {
            "key": "official",
            "matching_results": 148470
          },
          {
            "key": "President",
            "matching_results": 148116
          },
          {
            "key": "Japan",
            "matching_results": 141973
          },
          {
            "key": "200 day",
            "matching_results": 141381
          },
          {
            "key": "SEC",
            "matching_results": 128636
          },
          {
            "key": "200-day",
            "matching_results": 127623
          },
          {
            "key": "Zacks Investment Research",
            "matching_results": 122178
          },
          {
            "key": "Washington",
            "matching_results": 116740
          },
          {
            "key": "California",
            "matching_results": 110379
          },
          {
            "key": "London",
            "matching_results": 109144
          },
          {
            "key": "BidaskClub",
            "matching_results": 107961
          },
          {
            "key": "Australia",
            "matching_results": 106117
          },
          {
            "key": "Germany",
            "matching_results": 105055
          },
          {
            "key": "two years",
            "matching_results": 102961
          },
          {
            "key": "Securities and Exchange Commission",
            "matching_results": 101633
          },
          {
            "key": "America",
            "matching_results": 100127
          },
          {
            "key": "@",
            "matching_results": 97179
          },
          {
            "key": "Asia",
            "matching_results": 96589
          },
          {
            "key": "50 day",
            "matching_results": 91573
          },
          {
            "key": "Google",
            "matching_results": 91452
          },
          {
            "key": "The Associated Press",
            "matching_results": 91209
          },
          {
            "key": "Florida",
            "matching_results": 89790
          },
          {
            "key": "five years",
            "matching_results": 89695
          },
          {
            "key": "Africa",
            "matching_results": 89090
          },
          {
            "key": "executive",
            "matching_results": 88964
          },
          {
            "key": "50-day",
            "matching_results": 84941
          },
          {
            "key": "Russia",
            "matching_results": 84560
          },
          {
            "key": "three years",
            "matching_results": 83333
          },
          {
            "key": "Middle East",
            "matching_results": 82571
          },
          {
            "key": "six months",
            "matching_results": 82079
          },
          {
            "key": "Amazon",
            "matching_results": 81344
          },
          {
            "key": "three months",
            "matching_results": 77039
          },
          {
            "key": "one year",
            "matching_results": 76716
          },
          {
            "key": "France",
            "matching_results": 76564
          },
          {
            "key": "Mexico",
            "matching_results": 75936
          },
          {
            "key": "Securities & Exchange Commission",
            "matching_results": 71998
          },
          {
            "key": "chairman",
            "matching_results": 70629
          },
          {
            "key": "Houston",
            "matching_results": 69920
          },
          {
            "key": "Director",
            "matching_results": 69187
          },
          {
            "key": "President Donald Trump",
            "matching_results": 67126
          },
          {
            "key": "52-week",
            "matching_results": 66853
          },
          {
            "key": "Trump",
            "matching_results": 65813
          },
          {
            "key": "Thomson",
            "matching_results": 65451
          },
          {
            "key": "producer",
            "matching_results": 64182
          },
          {
            "key": "Jefferies Group LLC",
            "matching_results": 63556
          },
          {
            "key": "White House",
            "matching_results": 62937
          },
          {
            "key": "Donald Trump",
            "matching_results": 61998
          },
          {
            "key": "North Korea",
            "matching_results": 60237
          },
          {
            "key": "100%",
            "matching_results": 59528
          },
          {
            "key": "Apple",
            "matching_results": 59494
          },
          {
            "key": "Hurricane Harvey",
            "matching_results": 59083
          },
          {
            "key": "AP",
            "matching_results": 58763
          },
          {
            "key": "football",
            "matching_results": 58679
          },
          {
            "key": "12-month",
            "matching_results": 58615
          },
          {
            "key": "founder",
            "matching_results": 58079
          },
          {
            "key": "research analyst",
            "matching_results": 57146
          },
          {
            "key": "developer",
            "matching_results": 56980
          },
          {
            "key": "10 years",
            "matching_results": 56772
          },
          {
            "key": "12 month",
            "matching_results": 55678
          },
          {
            "key": "Ohio",
            "matching_results": 55379
          },
          {
            "key": "officer",
            "matching_results": 54822
          },
          {
            "key": "chief executive",
            "matching_results": 54401
          },
          {
            "key": "MarketBeat.com",
            "matching_results": 53872
          },
          {
            "key": "Chicago",
            "matching_results": 52563
          },
          {
            "key": "52 week",
            "matching_results": 52398
          },
          {
            "key": "principal",
            "matching_results": 52305
          },
          {
            "key": "Congress",
            "matching_results": 52165
          },
          {
            "key": "Morgan Stanley",
            "matching_results": 52045
          },
          {
            "key": "1-year",
            "matching_results": 51762
          },
          {
            "key": "NEW YORK",
            "matching_results": 51640
          },
          {
            "key": "Royal Bank Of Canada",
            "matching_results": 51018
          },
          {
            "key": "Britain",
            "matching_results": 50746
          },
          {
            "key": "Chairman",
            "matching_results": 50729
          },
          {
            "key": "20 years",
            "matching_results": 50530
          },
          {
            "key": "Los Angeles",
            "matching_results": 47026
          },
          {
            "key": "South Korea",
            "matching_results": 46739
          },
          {
            "key": "Nigeria",
            "matching_results": 46679
          },
          {
            "key": "EU",
            "matching_results": 46394
          },
          {
            "key": "South Africa",
            "matching_results": 46378
          },
          {
            "key": "Brazil",
            "matching_results": 46112
          }
        ]
      },
      {
        "type": "term",
        "field": "enriched_text.categories.label",
        "count": 100,
        "results": [
          {
            "key": "/business and industrial",
            "matching_results": 2160209
          },
          {
            "key": "/finance/investing/stocks",
            "matching_results": 471406
          },
          {
            "key": "/technology and computing",
            "matching_results": 373161
          },
          {
            "key": "/law, govt and politics/government",
            "matching_results": 292233
          },
          {
            "key": "/business and industrial/company/annual report",
            "matching_results": 287923
          },
          {
            "key": "/business and industrial/energy/oil",
            "matching_results": 285732
          },
          {
            "key": "/business and industrial/company/merger and acquisition",
            "matching_results": 229651
          },
          {
            "key": "/business and industrial/business news",
            "matching_results": 193279
          },
          {
            "key": "/business and industrial/construction",
            "matching_results": 187761
          },
          {
            "key": "/business and industrial/energy/oil/oil and gas prices",
            "matching_results": 176468
          },
          {
            "key": "/business and industrial/advertising and marketing/marketing",
            "matching_results": 175955
          },
          {
            "key": "/business and industrial/business operations/business plans",
            "matching_results": 164350
          },
          {
            "key": "/news",
            "matching_results": 145804
          },
          {
            "key": "/business and industrial/company/earnings",
            "matching_results": 140985
          },
          {
            "key": "/sports/football",
            "matching_results": 136522
          },
          {
            "key": "/law, govt and politics/law enforcement/police",
            "matching_results": 119017
          },
          {
            "key": "/law, govt and politics",
            "matching_results": 118643
          },
          {
            "key": "/business and industrial/manufacturing",
            "matching_results": 105413
          },
          {
            "key": "/business and industrial/agriculture and forestry/crops and seed",
            "matching_results": 105140
          },
          {
            "key": "/business and industrial/company/bankruptcy",
            "matching_results": 95138
          },
          {
            "key": "/business and industrial/energy/natural gas",
            "matching_results": 93013
          },
          {
            "key": "/business and industrial/advertising and marketing/advertising",
            "matching_results": 92316
          },
          {
            "key": "/education/school",
            "matching_results": 91020
          },
          {
            "key": "/business and industrial/energy/coal",
            "matching_results": 90450
          },
          {
            "key": "/business and industrial/business operations/management/project management",
            "matching_results": 90290
          },
          {
            "key": "/business and industrial/aerospace and defense/space technology",
            "matching_results": 89166
          },
          {
            "key": "/business and industrial/energy/electricity",
            "matching_results": 86751
          },
          {
            "key": "/technology and computing/internet technology/social network",
            "matching_results": 83191
          },
          {
            "key": "/law, govt and politics/legal issues/human rights",
            "matching_results": 81195
          },
          {
            "key": "/finance/investing/options",
            "matching_results": 80820
          },
          {
            "key": "/business and industrial/advertising and marketing/public relations",
            "matching_results": 80064
          },
          {
            "key": "/business and industrial/company/joint venture",
            "matching_results": 78293
          },
          {
            "key": "/art and entertainment/visual art and design/design",
            "matching_results": 77642
          },
          {
            "key": "/art and entertainment/movies and tv/movies",
            "matching_results": 76564
          },
          {
            "key": "/family and parenting/children",
            "matching_results": 76159
          },
          {
            "key": "/business and industrial/energy/renewable energy",
            "matching_results": 75020
          },
          {
            "key": "/science/weather/meteorological disaster/hurricane",
            "matching_results": 74976
          },
          {
            "key": "/travel/tourist facilities/hotel",
            "matching_results": 72274
          },
          {
            "key": "/society/unrest and war",
            "matching_results": 71563
          },
          {
            "key": "/finance/bank",
            "matching_results": 69956
          },
          {
            "key": "/health and fitness",
            "matching_results": 69657
          },
          {
            "key": "/business and industrial/chemicals industry/plastics and polymers",
            "matching_results": 65584
          },
          {
            "key": "/technology and computing/software",
            "matching_results": 64293
          },
          {
            "key": "/real estate",
            "matching_results": 62744
          },
          {
            "key": "/food and drink",
            "matching_results": 62416
          },
          {
            "key": "/home and garden",
            "matching_results": 61868
          },
          {
            "key": "/society/work/unemployment",
            "matching_results": 59723
          },
          {
            "key": "/science/weather",
            "matching_results": 58576
          },
          {
            "key": "/technology and computing/software/databases",
            "matching_results": 56277
          },
          {
            "key": "/travel/tourist destinations/australia and new zealand",
            "matching_results": 53558
          },
          {
            "key": "/business and industrial/energy/renewable energy/geothermal energy",
            "matching_results": 51554
          },
          {
            "key": "/travel/tourist destinations/japan",
            "matching_results": 51259
          },
          {
            "key": "/finance/personal finance/lending/credit cards",
            "matching_results": 51083
          },
          {
            "key": "/business and industrial/agriculture and forestry/farms and ranches",
            "matching_results": 50698
          },
          {
            "key": "/business and industrial/business operations/human resources",
            "matching_results": 49243
          },
          {
            "key": "/technology and computing/programming languages/javascript",
            "matching_results": 48988
          },
          {
            "key": "/travel/tourist destinations/canada",
            "matching_results": 45265
          },
          {
            "key": "/technology and computing/tech news",
            "matching_results": 45160
          },
          {
            "key": "/travel/tourist destinations/africa",
            "matching_results": 45151
          },
          {
            "key": "/science/mathematics/statistics",
            "matching_results": 45057
          },
          {
            "key": "/art and entertainment/books and literature",
            "matching_results": 44688
          },
          {
            "key": "/automotive and vehicles/cars",
            "matching_results": 44316
          },
          {
            "key": "/law, govt and politics/politics/elections",
            "matching_results": 44076
          },
          {
            "key": "/health and fitness/disease",
            "matching_results": 42751
          },
          {
            "key": "/business and industrial/energy/oil/oil company",
            "matching_results": 42640
          },
          {
            "key": "/art and entertainment/movies and tv/television",
            "matching_results": 42224
          },
          {
            "key": "/sports/baseball",
            "matching_results": 42195
          },
          {
            "key": "/finance/personal finance/insurance",
            "matching_results": 40709
          },
          {
            "key": "/education/graduate school/college",
            "matching_results": 39135
          },
          {
            "key": "/business and industrial/energy/nuclear power",
            "matching_results": 38856
          },
          {
            "key": "/shopping/retail",
            "matching_results": 38799
          },
          {
            "key": "/art and entertainment/music",
            "matching_results": 38597
          },
          {
            "key": "/business and industrial/advertising and marketing/telemarketing",
            "matching_results": 38549
          },
          {
            "key": "/travel/transports/air travel/airlines",
            "matching_results": 37129
          },
          {
            "key": "/technology and computing/internet technology/web search",
            "matching_results": 35836
          },
          {
            "key": "/technology and computing/consumer electronics/telephones/mobile phones",
            "matching_results": 34940
          },
          {
            "key": "/technology and computing/consumer electronics/telephones/mobile phones/smart phones",
            "matching_results": 34679
          },
          {
            "key": "/law, govt and politics/legal issues/legislation",
            "matching_results": 34645
          },
          {
            "key": "/finance/investing/funds/hedge fund",
            "matching_results": 34630
          },
          {
            "key": "/art and entertainment/shows and events/festival",
            "matching_results": 34130
          },
          {
            "key": "/business and industrial/agriculture and forestry/agriculture",
            "matching_results": 34057
          },
          {
            "key": "/society/welfare/healthcare/hospital",
            "matching_results": 32968
          },
          {
            "key": "/business and industrial/business operations/human resources/compensation and benefits",
            "matching_results": 32837
          },
          {
            "key": "/business and industrial/energy/renewable energy/solar energy",
            "matching_results": 32163
          },
          {
            "key": "/business and industrial/agriculture and forestry/livestock",
            "matching_results": 32073
          },
          {
            "key": "/business and industrial/biomedical",
            "matching_results": 31557
          },
          {
            "key": "/business and industrial/business operations/management/business process",
            "matching_results": 30746
          },
          {
            "key": "/finance",
            "matching_results": 30086
          },
          {
            "key": "/food and drink/food/grains and pasta",
            "matching_results": 30012
          },
          {
            "key": "/hobbies and interests/reading",
            "matching_results": 29882
          },
          {
            "key": "/business and industrial/logistics/air freight",
            "matching_results": 29437
          },
          {
            "key": "/sports/running and jogging",
            "matching_results": 28202
          },
          {
            "key": "/business and industrial/publishing",
            "matching_results": 28186
          },
          {
            "key": "/finance/investing/venture capital",
            "matching_results": 27848
          },
          {
            "key": "/food and drink/desserts and baking",
            "matching_results": 27575
          },
          {
            "key": "/family and parenting",
            "matching_results": 27573
          },
          {
            "key": "/technology and computing/computer reviews",
            "matching_results": 27524
          },
          {
            "key": "/finance/personal finance/financial planning/asset and portfolio management",
            "matching_results": 27373
          },
          {
            "key": "/education/alumni and reunions",
            "matching_results": 27222
          },
          {
            "key": "/law, govt and politics/law enforcement/fire department",
            "matching_results": 27014
          }
        ]
      }
    ];

    return (
      <Element name="scroll_to_results">
        {
          regularResults.matching_results > 0 || enrichedResults.matching_results > 0
            ? (
              <div className='enrichments'>
                <EnrichmentsSidebar
                  currentFilters={[1,2]}
                  aggregations={aggregations}
                />
                <div className='enrichments--results'>
                  <h3 className='enrichments--description'>
                    Search results while utilizing enrichment filtering
                  </h3>
                  <div className="enrichments--container">
                    {
                      [...Array(Math.min(totalResultsShown, maxResults))].map((x, rank) => {
                        const enrichedResult = this.getEnrichedResultWithOriginalRank(rank);

                        return (
                          <div
                          className={'enrichments--result'}
                          key={rank}
                          >
                            { rank === 0 && (<h5>Enrichment search</h5>) }
                            { enrichedResult && (
                              <ResultContainer
                                resultText={replaceNewlines(enrichedResult.text)}
                                resultRank={rank + 1}
                              >
                              </ResultContainer>
                            )
                            }
                          </div>
                        );
                      })
                    }
                  </div>
                  {
                    this.hasMoreResults() && <ShowMoreResults onClick={this.handleMoreResults} />
                  }
                </div>
              </div>
            )
            : <NoResults />
        }
      </Element>
    );
  }
}

EnrichmentsContainer.propTypes = {
  regularResults: shape({
    matching_results: number.isRequired,
    results: arrayOf(shape({
      text: string.isRequired,
    })).isRequired,
  }).isRequired,
  enrichedResults: shape({
    matching_results: number.isRequired,
    results: arrayOf(shape({
      text: string.isRequired,
    })).isRequired,
  }).isRequired,
  searchContainerHeight: number.isRequired,
  maxRegularResults: number.isRequired,
};

EnrichmentsContainer.defaultProps = {
  maxRegularResults: 10,
};

export default EnrichmentsContainer;
