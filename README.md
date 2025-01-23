# **Implementation Plan: Self-Serve Customer Lifecycle**

# **Table of Contents**

1. [Problem Statement](#problem-statement)  
2. [Overall Solution](#overall-solution)  
3. [Implementation Plan](#implementation-plan)  
    - [Step 1.1: Lifecycle Dashboard and Reports for Sales Reps (Quick Win)](#step-11-lifecycle-dashboard-and-reports-for-sales-reps-quick-win)  
    - [Step 1.2: Trial Expiration Alerts (Quick Win)](#step-12-trial-expiration-alerts-quick-win)  
    - [Step 2: Error Tracking and Monitoring (Foundation for Fault Tolerance)](#step-2-error-tracking-and-monitoring-foundation-for-fault-tolerance)  
    - [Step 3: Integration to Receive Trial Data](#step-3-integration-to-receive-trial-data)  
    - [Step 4: Workspace and Relationship Management](#step-4-workspace-and-relationship-management)  
    - [Step 5: Workspace Linking (Leads and Accounts)](#step-5-workspace-linking-leads-and-accounts)  
    - [Step 6: Data Privacy & Compliance](#step-6-data-privacy-compliance)  
    - [Step 7: Testing and Rollout](#step-7-testing-and-rollout)  
4. [How Requirements and Events Are Addressed](#how-requirements-and-events-are-addressed)  
    - [Requirements Fulfillment](#requirements-fulfillment)  
    - [Events Coverage](#events-coverage)  
5. [Summary of Action Items](#summary-of-action-items)  
6. [Actors Involved](#actors-involved)  

---

## **Problem Statement**
Sales representatives currently struggle to effectively manage self-serve customers due to:
1. **Incomplete Salesforce Records**: `Leads`, `Workspaces`, and `Accounts` require manual creation and often have missing data
2. **Delayed Status Updates**: Product lifecycle changes (trials, conversions, churn) aren't immediately reflected in Salesforce
3. **Limited Visibility**: Without proper dashboards or alert systems, sales teams can't effectively prioritize trials or respond to churned customers
4. **Current Sales Rep Experience**
![frustrated-rep](images/frustrated-rep.webp)

### **Current Go-To-Market Stack Integration**
- Marketo (Marketing Automation) creates initial leads
- Salesforce (CRM) stores customer records
- Salesforce CPQ handles quotes and orders
- Stripe manages billing
- Snowflake warehouses data

### **Key Assumptions**
1. **Existing Salesforce Configuration**:
   - `Workspace` custom object is already configured
   - User permissions and sharing rules are properly set up
   - Standard objects (`Lead`, `Account`, `Contact`) are configured per requirements

2. **Integration Infrastructure**:
   - Marketo is connected to Salesforce, requiring only process improvements
   - Stripe integration exists with the provisioning system
   - Platform Events feature is enabled in Salesforce
   - API limits and governance limits are sufficient for real-time events
   - Salesforce CPQ is configured to handle self-serve to sales-led conversions

3. **Data Quality**:
   - Email addresses in the provisioning system are valid and standardized
   - Workspace IDs are unique and consistent
   - Trial duration rules are standardized (30 days)

4. **Technical Environment**:
   - Development and testing environments (sandboxes) are available
   - Change management process exists for deployments
   - Monitoring tools are available for system health checks

5. **Business Process**:
   - Sales territory rules and lead assignment logic exist
   - Lead conversion process is defined
   - SLA requirements for data sync are defined

Note: We've based our plan on these assumptions about the current system. If we discover any differences during implementation, we'll work together to adjust our approach accordingly.

## **Overall Solution**
An automated, fault-tolerant system that:
1. Creates and links all required records (`Workspace`, `Lead`, and `Account`) automatically:
   - Leverages existing Workspace object
   - Uses Marketo's lead creation process
   - Maintains relationships between all objects

2. Syncs product lifecycle events to Salesforce instantly using Platform Events:
   - Captures trial, paid, and churn status changes
   - Includes Stripe subscription details
   - Handles out-of-order events gracefully

3. Provides sales teams with real-time dashboards and notifications:
   - Trial expiration alerts
   - Usage-based lead scoring
   - Customer lifecycle visibility
   - Error monitoring and resolution

4. Enables seamless upgrade path:
   - Self-serve to sales-led conversion process
   - Billing transition handling

5. Maintains data quality and compliance:
   - Data validation and standardization
   - Privacy controls and audit trails
   - Error logging and monitoring

6. **Expected Sales Rep Experience After Implementation**
![happy-rep](images/happy-rep.webp)

## **System Architecture**
![System Architecture](/images/system-architecture.png)

## **Data Relationships**
![Data Relationships](/images/data-relationship.png)

## **Data Flow**
![Sequence Diagram](/images/sequence-diagram.png)

## **Summary of Action Items**

### **Quick Wins (Immediate Value)**
- Lifecycle dashboard with trial/paid/churned status visibility
- Standard reports for trial tracking and conversion analysis
- KPI tracking system for measuring success
- Trial expiration notification system

### **Technical Foundation**
- Error tracking system (`Error_Log__c` object)
- Error monitoring dashboard
- Platform Event configuration (`SelfServeTrialEvent__e`)
- Event caching system (`Event_Cache__c` object)

### **Core Automation**
- Automated Workspace record creation/updates
- Lead/Account linking automation
- Lead conversion rules and field mappings
- Out-of-order event handling

### **Data Quality & Compliance**
- Data validation rules
- Privacy controls
- Audit trails
- Error handling procedures

### **Testing & Deployment**
- End-to-end testing plan
- Phased rollout strategy
- Monitoring and adoption tracking

---

## **Event Processing Sequence**
1. **Trial Signup Flow**:
   ```
   Platform Event Received (New Trial)
   └─► Create/Update Workspace
       └─► Find/Create Lead (via Email)
           └─► Find/Link Account (via Domain)
   ```

2. **Trial Conversion Flow**:
   ```
   Platform Event Received (Paid Conversion)
   └─► Update Workspace Status
       └─► Convert Lead to Account/Contact
           └─► Update Workspace Relationships
   ```

3. **Churn Flow**:
   ```
   Platform Event Received (Churn)
   └─► Update Workspace Status
   ```

# Implementation Plan

### **Step 1.1: Lifecycle Dashboard and Reports for Sales Reps (Quick Win)**

#### **Tasks**
1. **Create Lifecycle Dashboard**:
   - Show current status of all customers (`Trial`, `Paid`, `Churned`)
   - Add trial expiration date filters
   - Add product usage metrics and engagement scores
   - Highlight high-value prospects based on:
     - Usage patterns
     - Company size/domain
     - Feature adoption

2. **Standard Reports Setup**:
   - Trial Status Report:
     - Days remaining in trial
     - Usage metrics
     - Company size indicators
   - Conversion Pipeline Report:
     - Trial to paid conversion rates
     - Time to conversion metrics
     - Industry/segment analysis
   - Churn Analysis Report:
     - Churn reasons when available
     - Usage patterns before churn
     - Account characteristics

3. **KPI Tracking**:
   - Trial conversion rate by segment
   - Average time to conversion
   - Trial engagement scores
   - Self-serve to sales-led upgrade rate
   - Churn rate by customer segment

4. **Export and Integration**:
   - Schedule automated report delivery
   - Configure report subscriptions
   - Enable data export for external analysis

### **Step 1.2: Trial Expiration Alerts (Quick Win)**

#### **Objective**
Notify sales reps of trials nearing expiration for proactive follow-up.

#### **Tasks**
1. Build a **scheduled Flow or report** to identify trials expiring in the next 7 days
   - Query criteria:
     - Status = Trial
     - Trial End Date = Next 7 Days
     - Not already notified
2. Configure notifications (email/Salesforce/Slack) for sales reps
   - Email template design
   - Notification frequency rules
   - Notification grouping logic
3. Optionally include metrics like trial usage or start date
   - Define key metrics to include
   - Set up metric refresh schedule
   - Configure metric thresholds for highlighting

### **Step 2: Error Tracking and Monitoring (Foundation for Fault Tolerance)**

#### **Objective**
Build a robust error tracking system to monitor integration health from day one.

#### **Tasks**
1. **Set up the `Error Log` Custom Object**:
   - Fields:
     - `Error Name`: Brief description (Text, 255)
     - `Error Type`: Categorization (`Data Issue`, `Integration Failure`, etc.)
     - `Error Details`: Complete error message (Long Text Area)
     - `Source Process`: Origin of error (`Workspace Creation`, `Lead Link`, etc.)
     - `Associated Record`: Related record ID (Lookup: Any Object)
     - `Status`: Current state (`Open`, `Resolved`)
     - `Retry Count`: Number of retry attempts (Number)
     - `Date Occurred`: Timestamp (Date/Time)
     - `External Id`: Unique identifier for record (Text, 255)
     - `Stack Trace`: Full error stack trace (Long Text Area)
     - `Resolution Notes`: Notes about how error was resolved (Long Text Area)
     - `Resolution Date`: When error was resolved (Date/Time)
     - `Assigned To`: Who should investigate this error (Lookup: User)
     - `Priority`: Error severity (High/Medium/Low)

#### **Error Handling Process**
![Error Handling Flow](/images/error-handling-flow.png)

2. **Create Error Monitoring Dashboard**:
   - Display active errors by type, source, and frequency
   + Key Metrics to Display:
     - Error volume trends by type
     - Processing success rate
     - Retry attempts distribution
     - Average resolution time
     - Queue health metrics
   + Alert Configuration:
     - High error rate threshold alerts
     - Critical error immediate notifications
     - Stuck processing detection
     - Queue buildup warnings
   + Dashboard Components:
     - Error trend charts
     - Current error queue
     - Resolution time metrics
     - Success rate indicators

3. **Establish Error Handling Standards**:
   - Define logging practices for all Flows, Triggers, and integrations

### **Step 3: Integration to Receive Trial Data**

#### **Objective**
Enable real-time reception of customer lifecycle events.

#### **Integration Pattern Comparison**

| Aspect | Platform Events | Custom REST API |
|--------|----------------|-----------------|
| **Scalability** | + Native Salesforce queueing<br>+ Auto-scales with platform<br>- Limited by platform event limits | + Custom queueing possible<br>+ Can scale independently<br>- Requires infrastructure management |
| **Development** | + No endpoint management<br>+ Built-in retry mechanism<br>- Limited payload customization | + Full payload control<br>+ Flexible endpoint design<br>- Requires API versioning |
| **Maintenance** | + Managed by platform<br>+ Automatic upgrades<br>- Less control over infrastructure | - Requires endpoint monitoring<br>- Manual security updates<br>- Infrastructure costs |
| **Error Handling** | + Built-in replay capability<br>+ Event monitoring tools<br>+ Debug logs available | - Custom error handling needed<br>- Custom monitoring required<br>+ Detailed error control |
| **Security** | + Managed by platform<br>+ Built-in encryption<br>+ Event bus security | - Custom security needed<br>- Certificate management<br>+ IP restriction options |
| **Changes** | + Schema changes are versioned<br>+ No endpoint updates needed<br>- Limited flexibility | + Highly flexible<br>- Requires coordination<br>- Version management needed |

We chose Platform Events because:
1. Lower maintenance overhead
2. Native Salesforce features (replay, monitoring)
3. Built-in scalability
4. Simpler security model
5. Easier error handling
6. Trigger events in Salesforce through flows easily

#### **Tasks**
1. **Event Reception Infrastructure**:
   - Configure Platform Events:
     - `SelfServeTrialEvent__e`:
       ```
       Fields:
       - Workspace_ID__c: Unique identifier
       - Email__c: Customer email
       - Event_Type__c: (Trial/Conversion/Churn)
       - Event_Timestamp__c: When event occurred
       - Trial_Start_Date__c: When trial begins
       - Trial_End_Date__c: When trial expires
       - Company_Name__c: Company name from signup
       - Subscription_ID__c: Stripe subscription ID
       - Plan_Type__c: Current plan tier
       - MRR__c: Monthly recurring revenue
       - Billing_Interval__c: Monthly/Annual
       - Conversion_Date__c: When paid subscription started
       - Churn_Date__c: When subscription ended
       - Churn_Reason__c: Reason for churning
       - Feedback__c: Customer feedback
       ```

    Example Payloads:
      ```json
      // Trial Event
      {
          "Workspace_ID__c": "ws_12345",
          "Email__c": "user@company.com",
          "Event_Type__c": "Trial",
          "Event_Timestamp__c": "2024-01-23T13:45:00Z",
          "Trial_Start_Date__c": "2024-01-23T00:00:00Z",
          "Trial_End_Date__c": "2024-02-23T00:00:00Z",
          "Company_Name__c": "Company Inc"
      }

      // Conversion Event
      {
          "Workspace_ID__c": "ws_12345",
          "Email__c": "user@company.com",
          "Event_Type__c": "Conversion",
          "Event_Timestamp__c": "2024-02-15T14:30:00Z",
          "Subscription_ID__c": "sub_789",
          "Plan_Type__c": "Business",
          "MRR__c": 199.00,
          "Billing_Interval__c": "monthly",
          "Conversion_Date__c": "2024-02-15T00:00:00Z"
      }

      // Churn Event
      {
          "Workspace_ID__c": "ws_12345",
          "Email__c": "user@company.com",
          "Event_Type__c": "Churn",
          "Event_Timestamp__c": "2024-03-01T00:00:00Z",
          "Churn_Date__c": "2024-03-01T00:00:00Z",
          "Churn_Reason__c": "Switched to competitor",
          "Feedback__c": "Missing key features"
      }
      ```
   - Configure Platform Event settings:
     - Set replay ID retention period
     - Configure publish behavior
     - Set delivery SLA alerts
   - Create event storage object for caching:
     - `Event_Cache__c`:
       - `Event_Type__c`: Type of event
       - `Event_Data__c`: JSON of event data
       - `Processing_Status__c`: New/Processing/Completed/Error
       - `Retry_Count__c`: Number of retries
       - `Original_Timestamp__c`: When event occurred
       - `Processing_Notes__c`: Details of processing attempts

2. **Event Processing Framework**:
   - Configure event handlers for each type (Trial/Conversion/Churn)
   - Set up error handling and monitoring
   - Create scheduled job for cached events: (this can be either a batch job or a scheduled flow)

#### **Requirements Met**
- Enables real-time updates for lifecycle events
- Provides foundation for real-time data warehouse updates

#### **Events Covered**
- **New trial provisioned**.
- **Trial converts to paid**.
- **Customer churns**.

### **Step 4: Workspace and Relationship Management**

#### **Technical Implementation**:
- Platform Event Trigger for initial processing
- Record-Triggered Flow for relationship management
- Scheduled Flow for retry mechanism
- Assignment rules for manual review

#### **Event Cache Processing**
![Event Cache Processing](/images/event-cache-processing.png)

#### **Processing Flows**:

#### **Review Process**:
```
Unmatched Record Handling:
└─► Create review record
└─► Assign based on:
    - Domain type
    - Company size
    - Geographic region
└─► Set SLA based on criteria
└─► Track resolution metrics
```

### **Step 5: Workspace Linking**

#### **Objective**
Link `Workspace` records to `Leads` and `Accounts` for complete data relationships.

#### **Tasks**
1. **Lead Processing Flow**:
   ```
   Workspace Created/Updated
   └─► Check for existing Lead
       ├─► If exists: Link to Workspace
       └─► If none: Create new Lead
   ```

   ![Lead Processing Flow](/images/lead-processing-flow.png)

2. **Account Matching Flow**:
   ```
   After Lead Processing
   └─► Extract email domain
   └─► Search for matching Account
       ├─► If found: Link to Workspace
       └─► If none: Queue for review
   ```

   ![Lead Linking Flow](/images/lead-linking-flow.png)

3. **Lead Conversion Rules**:
   ```
   When Trial Converts to Paid:
   └─► Evaluate Lead Quality:
       ├─► High-Value Indicators:
       │   - Enterprise email domain
       │   - High usage metrics
       │   - Multiple users
       │   └─► Route to sales team
       └─► Standard Conversion:
           └─► Auto-convert to Account/Contact
   ```

   ![Lead Conversion Rules](/images/lead-conversion-rules.png)

4. **Marketo Sync Handler**:
   ```
   Lead Created in Marketo
   └─► Search for Workspace
       ├─► If found: Link records
       └─► If none: Cache for later
   ```

   ![Marketo Sync Handler](/images/marketo-sync-handler.png)

#### **Requirements Met**
- Ensures `Workspace` records are fully linked to marketing and sales data.

#### **Events Covered**
- **New trial provisioned**
- **Trial converts to paid**
  - Lead conversion to Account/Contact
  - Existing Account handling

### **Step 6: Data Privacy & Compliance**

#### **Objective**
Ensure all automated data handling complies with privacy regulations.

#### **Tasks**
1. Implement data retention policies
   - Define retention periods by record type
   - Set up automated archival process
   - Configure deletion workflows
2. Configure field-level security
   - Identify sensitive fields
   - Set up permission sets
   - Document access matrix
3. Set up audit trails
   - Configure field history tracking
   - Set up automated audit reports
   - Define audit review process

#### **Requirements Met**
- Ensures compliance with data privacy regulations
- Protects customer data

#### **Events Covered**
- All customer data handling events

### **Step 7: Testing and Rollout**

#### **Tasks**

1. **End-to-End Testing**:
   - Test Scenarios:
     - Happy path for each event type
     - Out-of-order event sequences
     - Error handling paths
     - Load testing for events
     - Integration touchpoints
     - Security and access controls

2. **Phased Rollout**:
   - Phase 1: Pilot
     - Select small sales team
     - Gather feedback
     - Adjust configurations
   - Phase 2: Full Deployment
     - Team by team rollout
     - Training sessions
     - Support process

3. **Monitoring Framework**:
   - Success Metrics:
     - Event processing success rate
     - Record linking accuracy
     - Processing time metrics
   - Adoption Metrics:
     - Dashboard usage stats
     - Alert response times
     - Queue resolution rates
   - System Health:
     - Event processing lag
     - Queue sizes
     - Error rates

4. **Post-Deployment Support**:
   - Monitor dashboards
   - Track adoption
   - Provide user support
   - Document learnings

#### **Requirements Met**
- Ensures reliability and smooth deployment
- Validates system functionality
- Enables user adoption tracking

#### **Events Covered**
- All event types through testing scenarios
- System performance under load
- Error handling procedures

---

## **How Requirements and Events Are Addressed**

### **Requirements Fulfillment**

| **Requirement**                                   | **Plan Step Addressing It**                                       |
|---------------------------------------------------|-------------------------------------------------------------------|
| Self-serve customers represented in Salesforce    | - Step 3: Platform Events for real-time data<br>- Step 4: Workspace automation<br>- Step 5: Lead/Account linking |
| Near-real-time updates                            | - Step 3: Platform Events configuration<br>- Step 4: Out-of-order handling<br>- Error caching and retry logic |
| Sales program enablement                          | - Step 1.1: Lifecycle dashboard and reports<br>- Step 1.2: Trial expiration alerts<br>- Step 5: Lead scoring and routing |
| Fault tolerance and error monitoring              | - Step 2: Error Log system<br>- Error monitoring dashboard<br>- Step 4: Event caching and retry logic |
| Data quality and compliance                       | - Step 6: Privacy controls and audit trails<br>- Step 4: Validation rules<br>- Step 5: Field mapping standards |

### **Events Coverage**

| **Product Event**          | **Salesforce Action**                                      | **Implementation Details**                  |
|----------------------------|----------------------------------------------------------|---------------------------------------------|
| New self-serve trial       | - Create/update Workspace<br>- Find/create Lead<br>- Link to Account if domain matches | - Step 3: Platform Event handling<br>- Step 4: Trial event flow<br>- Step 5: Lead/Account linking |
| Trial converts to paid     | - Update Workspace status<br>- Convert Lead to Account/Contact<br>- Apply field mappings<br>- Handle routing rules | - Step 4: Conversion event flow<br>- Step 5: Lead conversion rules<br>- Historical data preservation |
| Customer churns            | - Update Workspace status<br>- Log churn details<br>- Trigger notifications | - Step 4: Churn event flow<br>- Step 1.1: Churn reporting<br>- Historical data maintained |
| Out-of-order events       | - Cache events<br>- Process in correct sequence<br>- Update historical data | - Step 4: Out-of-order handling<br>- Event_Cache__c object<br>- Retry mechanisms |

---

## **Actors Involved**

- **Customer**: End user who initiates trials and uses the product
- **Provisioning System**: Backend service sending lifecycle events
- **Salesforce Admin**: System architect managing integration and monitoring
- **Sales Representative**: Dashboard user acting on customer insights
- **Marketo**: Marketing automation system creating initial leads

## **Key Information for Third Party Integration**

### **Platform Event Publishing**

#### **Endpoint**
```
POST /services/data/v59.0/sobjects/SelfServeTrialEvent__e
```

#### **Authentication**
- OAuth 2.0 Connected App credentials will be provided
- Required headers:
  ```
  Authorization: Bearer <access_token>
  Content-Type: application/json
  ```

#### **Event Types and Payloads**

1. **Trial Started**
```json
{
    "Workspace_ID__c": "ws_12345",
    "Email__c": "user@company.com",
    "Event_Type__c": "Trial",
    "Event_Timestamp__c": "2024-01-23T13:45:00Z",
    "Trial_Start_Date__c": "2024-01-23T00:00:00Z",
    "Trial_End_Date__c": "2024-02-23T00:00:00Z",
    "Company_Name__c": "Company Inc"
}
```

2. **Trial Converted**
```json
{
    "Workspace_ID__c": "ws_12345",
    "Email__c": "user@company.com",
    "Event_Type__c": "Conversion",
    "Event_Timestamp__c": "2024-02-15T14:30:00Z",
    "Subscription_ID__c": "sub_789",
    "Plan_Type__c": "Business",
    "MRR__c": 199.00,
    "Billing_Interval__c": "monthly",
    "Conversion_Date__c": "2024-02-15T00:00:00Z"
}
```

3. **Customer Churned**
```json
{
    "Workspace_ID__c": "ws_12345",
    "Email__c": "user@company.com",
    "Event_Type__c": "Churn",
    "Event_Timestamp__c": "2024-03-01T00:00:00Z",
    "Churn_Date__c": "2024-03-01T00:00:00Z",
    "Churn_Reason__c": "Switched to competitor",
    "Feedback__c": "Missing key features"
}
```

#### **Field Requirements**

| Field              | Type     | Required | Description                           |
|-------------------|----------|----------|---------------------------------------|
| Workspace_ID__c   | String   | Yes      | Unique identifier for the workspace   |
| Email__c          | String   | Yes      | Primary user's email                  |
| Event_Type__c     | String   | Yes      | One of: Trial, Conversion, Churn     |
| Event_Timestamp__c | DateTime | Yes      | When the event occurred              |
| Trial_Start_Date__c| DateTime | For Trial| When trial begins                    |
| Trial_End_Date__c  | DateTime | For Trial| When trial expires                   |
| Company_Name__c    | String   | For Trial| Company name                         |
| Subscription_ID__c | String   | For Conv.| Stripe subscription ID               |
| Plan_Type__c      | String   | For Conv.| Product plan name                    |
| MRR__c            | Decimal  | For Conv.| Monthly recurring revenue            |
| Billing_Interval__c| String   | For Conv.| monthly/annual                       |
| Churn_Date__c     | DateTime | For Churn| When subscription ended              |
| Churn_Reason__c   | String   | No       | Reason for churning                  |
| Feedback__c       | String   | No       | Customer feedback                     |

#### **Error Handling**
- Implement exponential backoff for retries
- Store failed events locally for replay
- Monitor Platform Event publish confirmation
- Log detailed error responses

#### **Testing**
Sandbox endpoint for testing:
```
POST /services/data/v59.0/sobjects/SelfServeTrialEvent__e
Host: test.salesforce.com
```

