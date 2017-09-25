import React, { Component } from 'react';
import { array } from 'prop-types';
import './styles.css';

class EnrichmentsSidebar extends Component {
  formatTitle(agg_type) {
    console.log('this.formatTitle('+agg_type+')');
    if(agg_type === 'currentFilters') {
      return('Filtering by');
    }
    else {
      console.log(agg_type.charAt(0).toUpperCase() + agg_type.slice(1));
      return agg_type.charAt(0).toUpperCase() + agg_type.slice(1);
    }
  }

  getAggregationResultsForType(agg_type) {
    console.log('getAggregationsForType('+agg_type+')');
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
      console.log(aggregation.results);
      return aggregation.results;
    }
    console.log('--NO RESULTS--');
    return null;
  }

  renderAggregationType(agg_type) {
    const results = this.getAggregationResultsForType(agg_type);
    return(
      <div>
        <div className={'enrichments-sidebar_'+agg_type+'--title'}>
          { this.formatTitle(agg_type) }
        </div>
        { results && (
          results.map((enrichment, i) => {
            return (
              <div key={i}>
                <button
                 key={i}
                 type='button'
                 className='enrichments--button'
                 >
                  { enrichment.key + ' (' + enrichment.matching_results + ')' }
                </button>
              </div>
            );
          })
        )}
      </div>
    )
  }

  render() {
    const { currentFilters } = this.props;
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
            <div className='enrichments-sidebar_current-filters--title'>
                Filtering by
            </div>
            {
              currentFilters.map((filter, i) => {
                return (
                  <div key={'current-filter--' + i}>
                    { filter }
                  </div>
                );
              })
            }
            <hr/>
            {
              aggregation_fields.forEach((field) => {
                console.log('renderAggregationType('+field+')');
                this.renderAggregationType(field)
              })
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
