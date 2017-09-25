import React, { Component } from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import { scroller, Element } from 'react-scroll';
import EnrichmentsComparison from './EnrichmentsComparison';
import EnrichmentsSidebar from './EnrichmentsSidebar';
import NoResults from '../../views/NoResults/NoResults';
import ShowMoreResults from '../../views/ShowMoreResults/ShowMoreResults';
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
        "field": "enriched_text.entities.text",
        "count": 3,
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
          }
        ]
      },
      {
        "type": "term",
        "field": "enriched_text.concepts.text",
        "count": 3,
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
                <div className='enrichments--results'>
                  <h3 className='enrichments--description'>
                    Compare the Standard search to a dataset with custom enrichment
                    filtering on Stack Exchange Travel data.
                  </h3>
                  <div className="enrichments--container">
                    {
                      [...Array(Math.min(totalResultsShown, maxResults))].map((x, rank) => {
                        const regularResult = regularResults.results[rank];
                        const enrichedResult = this.getEnrichedResultWithOriginalRank(rank);

                        return (
                          <EnrichmentsComparison
                            key={EnrichmentsContainer.getKey(regularResult, enrichedResult)}
                            index={rank}
                            regularResult={regularResult}
                            enrichedResult={enrichedResult}
                          />
                        );
                      })
                    }
                  </div>
                  {
                    this.hasMoreResults() && <ShowMoreResults onClick={this.handleMoreResults} />
                  }
                </div>
                <EnrichmentsSidebar
                  currentFilters={[1,2]}
                  aggregations={aggregations}
                />
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
