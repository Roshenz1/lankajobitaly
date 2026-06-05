# Test Coverage Analysis - Lanka Job Italy

## Executive Summary

The lankajobitaly codebase currently has **zero test coverage** with no test files or test infrastructure in place. This analysis identifies critical areas where tests should be prioritized and provides recommendations for test implementation.

---

## Current State Assessment

### Codebase Overview
- **Python modules**: 3 (fetch_jobs_adzuna.py, narrative_generator.py, generate_mcdonalds_reels.py)
- **JavaScript modules**: 1 (chatbot-embed.js)
- **Configuration files**: 3 JSON files (articles.json, jobs.json, omnivoice_config.json)
- **HTML pages**: 6 files (various landing pages and admin interface)
- **Test files**: 0 ❌

### Identified Code Modules

#### Python Module 1: `fetch_jobs_adzuna.py`
**Purpose**: Fetches job listings from Jooble API and updates jobs.json database

**Key Functions**:
- `fetch_jobs(city, category_key, keywords)` - Makes API calls to external service
- `update_jobs_json()` - Writes to filesystem and manages job database

**Risk Level**: 🔴 **HIGH**
- Makes external API calls (network dependency)
- File I/O operations (data loss risk)
- JSON parsing and data transformation
- No error handling visibility

---

#### Python Module 2: `narrative_generator.py`
**Purpose**: Generates multilingual audio narratives (English, Italian, Sinhala) using OmniVoice TTS

**Key Functions**:
- `NarrativeGenerator.__init__()` - Initialize with voice preset
- `generate_narrative()` - Generate speech for single language
- `generate_multilingual_narratives()` - Batch generate multiple languages
- `list_supported_languages()` - Return supported language mappings

**Risk Level**: 🟡 **MEDIUM**
- External library dependency (OmniVoice)
- File system operations
- Language validation
- Audio file generation (may fail silently)

---

#### Python Module 3: `generate_mcdonalds_reels.py`
**Purpose**: Generate branded audio narratives for McDonald's Verona job reels

**Key Functions**:
- `generate_mcdonalds_sinhala_audio()` - Generate single language audio
- `generate_all_languages()` - Generate multilingual narratives

**Risk Level**: 🟡 **MEDIUM**
- Depends on NarrativeGenerator
- Hardcoded narrative content
- No validation of generated output

---

#### JavaScript Module: `chatbot-embed.js`
**Purpose**: Embeddable Sinhala chatbot widget for the website

**Key Functions**:
- `toggleSinhalaChatbot()` - Toggle chatbot visibility
- `handleSinhalaChatKeyPress()` - Handle user input
- `sendSinhalaChatMessage()` - Send message and get response
- `getSinhalaChatBotResponse()` - Match keywords and return responses

**Risk Level**: 🟡 **MEDIUM**
- DOM manipulation
- Event handling
- Knowledge base matching logic
- UI/UX dependent

---

## Priority Test Coverage Areas

### 🔴 CRITICAL (Must implement first)

#### 1. **fetch_jobs_adzuna.py - API Integration Tests**
**Why**: Core business logic that fetches live job data

**Test Cases**:
- ✅ Test successful API response handling with valid jobs
- ✅ Test API error handling (timeout, 4xx, 5xx errors)
- ✅ Test response parsing with malformed JSON
- ✅ Test category mapping (6 categories correctly matched)
- ✅ Test city parameter validation
- ✅ Test job object structure validation (all required fields present)
- ✅ Test featured job selection (first job marked as featured)
- ✅ Test pagination/limiting to 5 jobs per category
- ✅ Test empty response handling

**Implementation**: 
```python
# pytest with mocking for API calls
# Mock requests.post() to avoid real API calls
# Use fixtures for sample API responses
```

#### 2. **fetch_jobs_adzuna.py - File I/O Tests**
**Why**: Prevents data loss and ensures reliable persistence

**Test Cases**:
- ✅ Test jobs.json creation when file doesn't exist
- ✅ Test preserving manual entries while updating API jobs
- ✅ Test JSON file validity after update
- ✅ Test ID re-indexing correctness
- ✅ Test file write error handling
- ✅ Test concurrent access scenarios
- ✅ Test backup creation before update (if applicable)

**Implementation**:
```python
# pytest with temp file fixtures
# Use tempfile.TemporaryDirectory() for isolated tests
# Verify JSON structure after writes
```

---

### 🟡 HIGH (Important for reliability)

#### 3. **narrative_generator.py - Language Support Tests**
**Why**: Multilingual feature core functionality

**Test Cases**:
- ✅ Test all 3 supported languages (en, it, si)
- ✅ Test unsupported language rejection with ValueError
- ✅ Test language code mapping correctness
- ✅ Test language information retrieval
- ✅ Test graceful handling when OmniVoice not installed

**Implementation**:
```python
# pytest for language validation
# Test input validation
# Test fallback behavior
```

#### 4. **narrative_generator.py - Audio Generation Tests**
**Why**: Ensures audio files are created correctly

**Test Cases**:
- ✅ Test output directory creation
- ✅ Test audio file path generation and naming
- ✅ Test file exists after generation (without OmniVoice, mock it)
- ✅ Test custom output path handling
- ✅ Test error handling when audio generation fails
- ✅ Test batch multilingual generation returns correct structure

**Implementation**:
```python
# Mock OmniVoice.tts() method
# Use fixtures for mock audio objects
# Test return value structure
```

#### 5. **chatbot-embed.js - Core Interaction Tests**
**Why**: User-facing feature with business logic

**Test Cases**:
- ✅ Test chatbot toggle functionality (show/hide)
- ✅ Test message sending and display
- ✅ Test Enter key submission
- ✅ Test Shift+Enter for new lines
- ✅ Test empty message prevention
- ✅ Test typing indicator display and removal
- ✅ Test response delay simulation

**Implementation**:
```javascript
// Jest + jsdom for DOM testing
// Test event listeners
// Test DOM manipulation
```

---

### 🟠 MEDIUM (Enhanced reliability)

#### 6. **chatbot-embed.js - Knowledge Base Tests**
**Why**: Ensures correct information is provided to users

**Test Cases**:
- ✅ Test keyword matching for "බලපත්‍ර පරිවර්තනය" (document translation)
- ✅ Test keyword matching for "වාහන මිලදීගැනීම" (vehicle purchase)
- ✅ Test case-insensitive keyword matching
- ✅ Test default fallback response when no keywords match
- ✅ Test multiple keyword variations in single topic
- ✅ Test response content accuracy

**Implementation**:
```javascript
// Jest unit tests for getSinhalaChatBotResponse()
// Test all knowledge base entries
// Verify response content
```

#### 7. **narrative_generator.py - Integration Tests**
**Why**: Verify end-to-end narrative generation workflow

**Test Cases**:
- ✅ Test complete workflow from text to file path
- ✅ Test multilingual batch generation with mixed languages
- ✅ Test output file naming consistency
- ✅ Test handling of special characters in text (Sinhala, Italian)
- ✅ Test voice preset application

**Implementation**:
```python
# End-to-end tests with mocked OmniVoice
# Test realistic narrative content
# Verify output structure
```

#### 8. **generate_mcdonalds_reels.py - Narrative Content Tests**
**Why**: Ensure branded content is correctly generated

**Test Cases**:
- ✅ Test Sinhala narrative generation with specific content
- ✅ Test multilingual narrative generation (all 3 languages)
- ✅ Test content preservation across languages
- ✅ Test output file organization
- ✅ Test metadata in results (language codes, paths)

**Implementation**:
```python
# Test with mocked NarrativeGenerator
# Verify narrative content structure
# Test output organization
```

---

### 🟢 LOW (Nice to have)

#### 9. **HTML Pages - Static Content Validation**
**Why**: Ensure pages render without errors

**Test Cases**:
- ✅ Test HTML validity (HTML5 compliance)
- ✅ Test broken internal links
- ✅ Test required asset availability
- ✅ Test meta tags presence
- ✅ Test Sinhala font support

**Implementation**:
```python
# html5lib or similar validator
# Link checking
# Asset verification
```

#### 10. **JSON Configuration Files - Schema Validation**
**Why**: Prevent configuration errors

**Test Cases**:
- ✅ Test jobs.json schema validity
- ✅ Test articles.json schema validity
- ✅ Test omnivoice_config.json schema validity
- ✅ Test required fields presence
- ✅ Test data type correctness

**Implementation**:
```python
# jsonschema library
# Define schemas for each config file
# Validate against schemas
```

---

## Recommended Test Stack

### Python Testing
```
pytest (framework)
pytest-mock (mocking)
pytest-cov (coverage reporting)
pytest-asyncio (async support, if needed)
responses (HTTP mocking)
```

**Installation**:
```bash
pip install pytest pytest-mock pytest-cov responses
```

### JavaScript Testing
```
Jest (framework)
jsdom (DOM simulation)
@testing-library/dom (better DOM testing)
```

**Installation**:
```bash
npm install --save-dev jest jsdom @testing-library/dom
```

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
1. Set up test infrastructure (pytest, Jest, configs)
2. Implement critical path tests for `fetch_jobs_adzuna.py` (API + File I/O)
3. Achieve 40% coverage on critical modules
4. Set up CI/CD integration for test runs

### Phase 2: Core Features (Weeks 3-4)
1. Add tests for `narrative_generator.py` (language + audio generation)
2. Add chatbot interaction tests (`chatbot-embed.js`)
3. Implement knowledge base validation tests
4. Achieve 60% overall coverage

### Phase 3: Polish (Weeks 5-6)
1. Add integration tests
2. Add configuration validation tests
3. Add HTML/JSON schema validation
4. Achieve 75%+ coverage
5. Document test patterns and best practices

### Phase 4: Maintenance (Ongoing)
1. Maintain >75% coverage threshold
2. Add tests for new features before implementation
3. Regular coverage audits

---

## Coverage Targets

| Module | Current | Phase 1 | Phase 2 | Phase 3 | Target |
|--------|---------|---------|---------|---------|--------|
| fetch_jobs_adzuna.py | 0% | 70% | 80% | 90% | >85% |
| narrative_generator.py | 0% | 0% | 70% | 85% | >80% |
| generate_mcdonalds_reels.py | 0% | 0% | 50% | 80% | >75% |
| chatbot-embed.js | 0% | 0% | 60% | 80% | >75% |
| **Overall** | **0%** | **35%** | **60%** | **80%** | **>75%** |

---

## Critical Gaps Identified

### 🚨 No Input Validation
- API city parameters not validated
- Narrative text length not checked
- Chat messages not sanitized for XSS (JavaScript)

### 🚨 No Error Logging
- Silent failures in audio generation
- No centralized error tracking
- Limited exception details in catch blocks

### 🚨 No Timeout Handling
- API calls have no realistic timeout
- No circuit breaker for repeated failures
- No retry mechanism with exponential backoff

### 🚨 No Data Validation
- API responses not validated against schema
- Job object structure assumed to be correct
- No type hints for better IDE support

### 🚨 Missing Observability
- No structured logging
- No metrics collection
- No health check endpoints

---

## Quick Start: Implementing First Test

### Example: Test for `fetch_jobs_adzuna.py`

```python
# tests/test_fetch_jobs.py
import pytest
from unittest.mock import patch, MagicMock
from fetch_jobs_adzuna import fetch_jobs, CATEGORIES

@pytest.fixture
def mock_response():
    return {
        "jobs": [
            {
                "title": "Cameriere",
                "company": "Ristorante Italia",
                "snippet": "Exciting job opportunity in hospitality",
                "link": "https://example.com/job1"
            }
        ]
    }

@patch('fetch_jobs_adzuna.requests.post')
def test_fetch_jobs_success(mock_post, mock_response):
    """Test successful job fetching from API"""
    mock_post.return_value.json.return_value = mock_response
    mock_post.return_value.raise_for_status.return_value = None
    
    jobs = fetch_jobs("verona", "ristorazione", "cameriere cuoco")
    
    assert len(jobs) == 1
    assert jobs[0]['title'] == "Cameriere"
    assert jobs[0]['type'] == "ristorazione"
    assert jobs[0]['featured'] == True
    assert jobs[0]['ico'] == "🍽️"

@patch('fetch_jobs_adzuna.requests.post')
def test_fetch_jobs_api_error(mock_post):
    """Test API error handling"""
    mock_post.side_effect = Exception("API timeout")
    
    jobs = fetch_jobs("verona", "ristorazione", "cameriere cuoco")
    
    assert jobs == []

def test_invalid_language():
    """Test invalid category rejection"""
    with pytest.raises(KeyError):
        fetch_jobs("verona", "invalid_category", "test")
```

---

## Maintenance & Continuous Improvement

### Pre-commit Hook Recommendations
```bash
# Prevent commits with zero test additions
pytest --cov --cov-fail-under=75
```

### CI/CD Integration
- Run tests on every PR
- Generate coverage reports
- Fail if coverage decreases
- Comment coverage on PRs

### Documentation
- Add test examples to README
- Document test patterns
- Create testing guide for contributors
- Maintain test deprecation log

---

## Summary of Recommendations

| Priority | Area | Effort | Impact | Tests |
|----------|------|--------|--------|-------|
| 🔴 CRITICAL | API Integration | Medium | High | 9 |
| 🔴 CRITICAL | File I/O | Medium | High | 6 |
| 🟡 HIGH | Language Support | Low | Medium | 5 |
| 🟡 HIGH | Audio Generation | Medium | Medium | 6 |
| 🟡 HIGH | Chatbot Interactions | Medium | High | 7 |
| 🟠 MEDIUM | Knowledge Base | Low | Medium | 6 |
| 🟠 MEDIUM | Integration Tests | High | Medium | 5 |
| 🟢 LOW | HTML Validation | Low | Low | 5 |

**Total Recommended Tests**: ~49 test cases

**Estimated Implementation Time**: 80-100 hours across 6 weeks

**Expected Coverage Improvement**: 0% → 75%+ overall

---

## Next Steps

1. **Immediate**: Review this analysis and prioritize modules
2. **Week 1**: Set up test infrastructure and implement Phase 1 tests
3. **Week 2-3**: Implement critical path tests
4. **Week 4-6**: Expand to high-priority modules
5. **Ongoing**: Maintain coverage and integrate with CI/CD

---

**Document Version**: 1.0  
**Last Updated**: 2025-06-05  
**Author**: Test Coverage Analysis  
