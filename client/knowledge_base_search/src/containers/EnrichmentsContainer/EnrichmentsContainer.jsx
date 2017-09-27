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
      aggregations,
    } = this.props;
    const { totalResultsShown } = this.state;
    const maxResults = Math.max(maxRegularResults, enrichedResults.results.length);

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
    aggregations: arrayOf(shape({
      count: number.isRequired,
      field: string.isRequired,
      results: arrayOf(shape({
        key: string.isRequired,
        matching_results: number.isRequired,
      })),
      type: string.isRequired,
    })),
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
  aggregations: arrayOf(shape({
    count: number.isRequired,
    field: string.isRequired,
    results: arrayOf(shape({
      key: string.isRequired,
      matching_results: number.isRequired,
  }))})).isRequired,
};

EnrichmentsContainer.defaultProps = {
  maxRegularResults: 10,
};

export default EnrichmentsContainer;
