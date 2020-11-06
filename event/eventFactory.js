class BaseEvent{
  constructor(event_id, event_type, attributes, meta){
    this.event_id = event_id;
    this.event_type = event_type;
    this.attributes = attributes;
    this.meta = {
      ...meta,
      "created_at": (new Date()).toISOString(),
    };
  }
}

class EventFactory{
  constructor(serviceName){
    if (typeof serviceName == 'undefined') throw Error('Event Factory must have a serviceName')
    this.serviceName = serviceName;
  }

  create(event_id, event_type, attributes, metadata){
    if(typeof attributes != 'object' || Object.keys(attributes).length === 0){
      throw Error ('typeof attributes must be object and must contain data!')
    }
    const meta = {
      ...metadata,
      "host": this.serviceName
    }
    return new BaseEvent(event_id, event_type, attributes, meta)
  }
}

module.exports = EventFactory;