import React, { Component } from 'react';
import { arrayOf, shape, string, number, func } from 'prop-types';
import classNames from 'classnames';
import './styles.css';

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class EnrichmentsSidebar extends Component {
  getAggregationResultsForType(aggregationType) {
    const aggregation = this.props.aggregations.find(agg =>
      agg.field === this.fieldForAggType(aggregationType),
    );
    if (aggregation) {
      return aggregation.results;
    }
    return null;
  }

  fieldForAggType(aggregationType) {
    const { fields } = this.props;
    return fields[aggregationType];
  }

  handleFilterClick(aggregationType, key) {
    const { onEnrichmentFilterClick } = this.props;
    const filterString = `${this.fieldForAggType(aggregationType)}:"${key}"`;
    return onEnrichmentFilterClick(filterString);
  }

  renderAggregationType(aggregationType) {
    const results = this.getAggregationResultsForType(aggregationType);
    // get top 10 results, not first 10 results
    return (
      <div key={`${aggregationType}--base`}>
        <div className={'enrichments-sidebar--title'} key={`${aggregationType}--title`}>
          { capitalizeFirstLetter(aggregationType) }
        </div>
        { results && (
          results.map((enrichment, i) =>
            (
              <div key={`${aggregationType}-${enrichment.key}--base`}>
                <button
                  key={`${aggregationType}-${enrichment.key}`}
                  type="button"
                  className={
                    classNames('enrichments--button', {
                      'first-button': i === 0,
                    })
                  }
                  onClick={() => this.handleFilterClick(aggregationType, enrichment.key)}
                >
                  { capitalizeFirstLetter(enrichment.key) }
                </button>
                <span className={'enrichments--button-count'}>
                  { `(${enrichment.matching_results})` }
                </span>
              </div>
            )))}
        <hr className={'enrichments-sidebar--hr'} />
      </div>
    );
  }

  render() {
    const aggregationFields = [
      'entities',
      'concepts',
      'categories',
      'sentiments',
    ];

    return (
      <div className="enrichments-sidebar--base">
        <div className="enrichments-sidebar--list">
          <div className="enrichments-sidebar--title">
              Filter by Enrichments
          </div>
          <hr className={'enrichments-sidebar--hr'} />
          {
            aggregationFields.map(field =>
              this.renderAggregationType(field),
            )
          }
        </div>
      </div>
    );
  }
}

EnrichmentsSidebar.propTypes = {
  aggregations: arrayOf(shape({
    type: string.isRequired,
    field: string.isRequired,
    count: number.isRequired,
    results: arrayOf(shape({
      key: string.isRequired,
      matching_results: number.isRequired,
    })),
  })).isRequired,
  onEnrichmentFilterClick: func.isRequired,
  fields: shape({
    categories: string,
    concepts: string,
    entitites: string,
    sentiments: string,
  }).isRequired,
};

export default EnrichmentsSidebar;
