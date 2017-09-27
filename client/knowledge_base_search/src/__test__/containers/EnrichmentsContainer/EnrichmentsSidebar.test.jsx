import React from 'react';
import ReactDOM from 'react-dom';
import EnrichmentsSidebar from '../../../containers/EnrichmentsContainer/EnrichmentsSidebar';

describe('<EnrichmentsSidebar />', () => {
  let wrapper;
  const onEnrichmentFilterClickMock = jest.fn();
  const props = {
    aggregations: [
      {
        "type": "term",
        "field": "enriched_text.keywords.text",
        "count": 2,
        "results": [
          {
            "key": "company",
            "matching_results": 357040
          },
          {
            "key": "shares",
            "matching_results": 346871
          },
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
    ],
    onEnrichmentFilterClick: onEnrichmentFilterClickMock,
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EnrichmentsSidebar {...props} />, div);
  });
});