import React, { Component } from 'react';
import { string, number, arrayOf, shape, func } from 'prop-types';
import { scroller, Element } from 'react-scroll';
import EnrichmentsSidebar from './EnrichmentsSidebar';
import NoResults from '../../views/NoResults/NoResults';
import ShowMoreResults from '../../views/ShowMoreResults/ShowMoreResults';
import ResultContainer from '../ResultContainer/ResultContainer';
import replaceNewlines from '../../utils/replaceNewlines';
import './styles.css';
import '../../__test__/containers/EnrichmentsContainer/aggregations_mock.json';

class EnrichmentsContainer extends Component {
  static getKey(enrichedResult) {
    if (enrichedResult) {
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
    const { enrichedResults } = this.props;
    const enrichedResult = enrichedResults.results[rank];

    return enrichedResult;
  }

  hasMoreResults() {
    const { enrichedResults } = this.props;
    const totalResultsShown = this.state.totalResultsShown;

    return enrichedResults.results.length > totalResultsShown;
  }

  handleMoreResults = () => {
    this.setState({ totalResultsShown: this.state.totalResultsShown + 1 });
  }

  render() {
    const {
      enrichedResults,
      maxRegularResults,
      onEnrichmentFilterClick,
      fields,
    } = this.props;
    const {
      totalResultsShown,
    } = this.state;
    const maxResults = Math.max(maxRegularResults, enrichedResults.results.length);

    const aggregations = [
      {
        type: 'term',
        field: 'enriched_text.keywords.text',
        count: 100,
        results: [
          {
            key: 'company',
            matching_results: 357040,
          },
          {
            key: 'shares',
            matching_results: 346871,
          },
          {
            key: 'people',
            matching_results: 276715,
          },
          {
            key: 'quarter',
            matching_results: 256746,
          },
          {
            key: 'stock',
            matching_results: 246772,
          },
          {
            key: 'United States',
            matching_results: 229182,
          },
          {
            key: 'average price',
            matching_results: 228828,
          },
          {
            key: 'time',
            matching_results: 227867,
          },
          {
            key: 'hold rating',
            matching_results: 220190,
          },
          {
            key: 'rating',
            matching_results: 192973,
          },
          {
            key: 'Zacks Investment Research',
            matching_results: 186336,
          },
        ],
      },
      {
        type: 'term',
        field: 'enriched_text.sentiment.document.label',
        count: 3,
        results: [
          {
            key: 'positive',
            matching_results: 2841187,
          },
          {
            key: 'negative',
            matching_results: 1633542,
          },
          {
            key: 'neutral',
            matching_results: 362964,
          },
        ],
      },
      {
        type: 'term',
        field: 'enriched_text.concepts.text',
        count: 100,
        results: [
          {
            key: 'Stock market',
            matching_results: 529933,
          },
          {
            key: 'Stock',
            matching_results: 519045,
          },
          {
            key: 'United States',
            matching_results: 458042,
          },
          {
            key: 'Share',
            matching_results: 303455,
          },
          {
            key: 'Average',
            matching_results: 284154,
          },
          {
            key: 'Marketing',
            matching_results: 261241,
          },
          {
            key: 'Investment',
            matching_results: 255516,
          },
          {
            key: 'Finance',
            matching_results: 232778,
          },
          {
            key: 'English-language films',
            matching_results: 216350,
          },
          {
            key: 'Revenue',
            matching_results: 213457,
          },
          {
            key: 'The Quarter at Tropicana',
            matching_results: 210311,
          },
        ],
      },
      {
        type: 'term',
        field: 'enriched_text.entities.text',
        count: 100,
        results: [
          {
            key: 'U.S.',
            matching_results: 381592,
          },
          {
            key: 'United States',
            matching_results: 355812,
          },
          {
            key: 'Reuters',
            matching_results: 282975,
          },
          {
            key: 'US',
            matching_results: 266169,
          },
          {
            key: 'CEO',
            matching_results: 264947,
          },
          {
            key: 'NYSE',
            matching_results: 246017,
          },
          {
            key: 'China',
            matching_results: 237162,
          },
          {
            key: 'Facebook',
            matching_results: 233802,
          },
          {
            key: 'Europe',
            matching_results: 230091,
          },
          {
            key: 'analyst',
            matching_results: 199587,
          },
          {
            key: 'Twitter',
            matching_results: 195912,
          },
        ],
      },
      {
        type: 'term',
        field: 'enriched_text.categories.label',
        count: 100,
        results: [
          {
            key: '/business and industrial',
            matching_results: 2160209,
          },
          {
            key: '/finance/investing/stocks',
            matching_results: 471406,
          },
          {
            key: '/technology and computing',
            matching_results: 373161,
          },
          {
            key: '/law, govt and politics/government',
            matching_results: 292233,
          },
          {
            key: '/business and industrial/company/annual report',
            matching_results: 287923,
          },
          {
            key: '/business and industrial/energy/oil',
            matching_results: 285732,
          },
          {
            key: '/business and industrial/company/merger and acquisition',
            matching_results: 229651,
          },
          {
            key: '/business and industrial/business news',
            matching_results: 193279,
          },
          {
            key: '/business and industrial/construction',
            matching_results: 187761,
          },
          {
            key: '/business and industrial/energy/oil/oil and gas prices',
            matching_results: 176468,
          },
          {
            key: '/business and industrial/advertising and marketing/marketing',
            matching_results: 175955,
          },
        ],
      },
    ];

    return (
      <Element name="scroll_to_results">
        {
          enrichedResults.matching_results > 0
            ? (
              <div className="enrichments">
                <EnrichmentsSidebar
                  onEnrichmentFilterClick={onEnrichmentFilterClick}
                  aggregations={aggregations}
                  fields={fields}
                />
                <div className="enrichments--results">
                  <h3 className="enrichments--description">
                    Search results while utilizing enrichment filtering
                  </h3>
                  <div className="enrichments--container">
                    {
                      [...Array(Math.min(totalResultsShown, maxResults))].map((x, rank) => {
                        const enrichedResult = this.getEnrichedResultWithOriginalRank(rank);

                        return (
                          <div
                            className="enrichments--result"
                            key={enrichedResult ? enrichedResult.id : 0}
                          >
                            { rank === 0 && (<h5>Enrichment search</h5>) }
                            { enrichedResult && (
                              <ResultContainer
                                resultText={replaceNewlines(enrichedResult.text)}
                                resultRank={rank + 1}
                              />
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
  enrichedResults: shape({
    matching_results: number.isRequired,
    results: arrayOf(shape({
      text: string.isRequired,
    })).isRequired,
  }).isRequired,
  searchContainerHeight: number.isRequired,
  maxRegularResults: number.isRequired,
  onEnrichmentFilterClick: func.isRequired,
  fields: shape({
    categories: string,
    concepts: string,
    entitites: string,
    sentiments: string,
  }).isRequired,
};

EnrichmentsContainer.defaultProps = {
  maxRegularResults: 10,
};

export default EnrichmentsContainer;
