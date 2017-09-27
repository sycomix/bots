import React, { Component } from 'react';
import { array, func } from 'prop-types';
import classNames from 'classnames';
import './styles.css';

class EnrichmentsSidebar extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  formatTitle(agg_type) {
    return this.capitalizeFirstLetter(agg_type);
  }

  fieldForAggType(agg_type) {
    const fields = {
      entities: 'enriched_text.entities.text',
      concepts: 'enriched_text.concepts.text',
      categories: 'enriched_text.categories.label',
      sentiments: 'enriched_text.sentiment.document.label'
    };
    return fields[agg_type];
  }

  getAggregationResultsForType(agg_type) {
    const aggregation = this.props.aggregations.find((aggregation) => {
      return aggregation.field === this.fieldForAggType(agg_type)
    });
    if(aggregation) {
      return aggregation.results;
    }
    return null;
  }

  handleFilterClick(agg_type, key) {
    const { onEnrichmentFilterClick } = this.props;
    const filterString = this.fieldForAggType(agg_type) + ':"' + key + '"';
    return onEnrichmentFilterClick(filterString);
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
               onClick={this.handleFilterClick.bind(this, agg_type, enrichment.key)}
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
  aggregations: array.isRequired,
  onEnrichmentFilterClick: func.isRequired,
};

export default EnrichmentsSidebar;
