---
trigger: manual
---

"column_name"	"data_type"	"character_maximum_length"	"is_nullable"	"column_default"
"id"	"integer"		"NO"	"nextval('ruc_data_id_seq'::regclass)"
"numero_ruc"	"character varying"	13	"NO"	
"razon_social"	"text"		"YES"	
"estado_contribuyente"	"character varying"	50	"YES"	
"estado_contribuyente_raw"	"character varying"	50	"YES"	
"clase_contribuyente"	"character varying"	50	"YES"	
"clase_contribuyente_raw"	"character varying"	50	"YES"	
"tipo_contribuyente"	"character varying"	50	"YES"	
"tipo_contribuyente_raw"	"character varying"	50	"YES"	
"fecha_inicio_actividades"	"date"		"YES"	
"fecha_actualizacion"	"date"		"YES"	
"obligado"	"character varying"	5	"YES"	
"actividad_economica"	"text"		"YES"	
"datos_adicionales"	"jsonb"		"YES"	
"validation_errors"	"jsonb"		"YES"	
"is_valid"	"boolean"		"YES"	"true"