import React, { Component } from 'react';
import { array } from 'prop-types';
import classNames from 'classnames';
import './styles.css';

class EnrichmentsSidebar extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  formatTitle(agg_type) {
    if(agg_type === 'currentFilters') {
      return('Filtering by');
    }
    else {
      return this.capitalizeFirstLetter(agg_type);
    }
  }

  getAggregationResultsForType(agg_type) {
    const fields = {
      entities: 'enriched_text.entities.text',
      concepts: 'enriched_text.concepts.text',
      categories: 'enriched_text.categories.label',
      sentiments: 'enriched_text.sentiment.document.label'
    };
    const aggregation = this.props.aggregations.find((aggregation) => {
      return aggregation.field === fields[agg_type]
    });
    if(aggregation) {
      return aggregation.results;
    }
    return null;
  }

  renderAggregationType(agg_type) {
    let results = this.getAggregationResultsForType(agg_type);
    //TODO: get top 10 results, not first 10 results
    return(
      <div key={agg_type}>
        <div className={'enrichments-sidebar--title'} key={agg_type}>
          { this.formatTitle(agg_type) }
        </div>
        { results && (
          results.slice(0,9).map((enrichment, i) =>
            <div key={i}>
              <button
               key={i}
               type='button'
               className={
                 classNames('enrichments--button', {
                   'first-button': i === 0,
                 })
               }
               >
                { this.capitalizeFirstLetter(enrichment.key) }
              </button>
              <span className={'enrichments--button-count'}>
                { '(' + enrichment.matching_results + ')' }
              </span>
            </div>
        ))}
        <hr className={'enrichments-sidebar--hr'}/>
      </div>
    )
  }

  render() {
    const aggregation_fields = [
      'entities',
      'concepts',
      'categories',
      'sentiments'
    ];

    return(
        <div className='enrichments-sidebar--base'>
          <div className='enrichments-sidebar--list'>
            <div className='enrichments-sidebar--title'>
                Filter by Enrichments
            </div>
            <hr className={'enrichments-sidebar--hr'}/>
            {
              aggregation_fields.map((field) =>
                this.renderAggregationType(field)
              )
            }
          </div>
        </div>
    );
  }
}

EnrichmentsSidebar.propTypes = {
  currentFilters: array.isRequired,
  aggregations: array.isRequired,
};

export default EnrichmentsSidebar;
