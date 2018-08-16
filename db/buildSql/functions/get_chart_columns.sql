-- FUNCTION: public.get_chart_columns(bigint)

-- DROP FUNCTION public.get_chart_columns(bigint);

CREATE OR REPLACE FUNCTION public.get_chart_columns(
	"chartId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(json_build_object(
	'id', col.id,
	'columnIndex', col."columnIndex",
	'dataType', get_item(col."dataTypeId"),
	'picklist', get_type(pcklstlnk."targetId"),
	'text', get_description(col.id, 1072)
))
FROM adm_def_chart_column col
LEFT OUTER JOIN adm_link pcklstlnk ON pcklstlnk."referenceId" = col.id AND pcklstlnk."typeId" = 1070
WHERE col."chartId" = $1

$BODY$;

ALTER FUNCTION public.get_chart_columns(bigint)
    OWNER TO postgres;
