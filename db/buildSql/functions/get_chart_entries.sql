-- FUNCTION: public.get_chart_entries(bigint)

-- DROP FUNCTION public.get_chart_entries(bigint);

CREATE OR REPLACE FUNCTION public.get_chart_entries(
	"chartId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(json_build_object(
	'id', entry.id,
	'columnIndex', entry."columnIndex",
	'rowIndex', entry."rowIndex",
	'text', get_description(entry.id, 1072),
	'boolValue', boolval."boolValue",
	'numberValue', numval."numberValue",
	'dice', get_dice(dicelnk."targetId"),
	'picklistItem', get_item(itmlnk."targetId")
))
FROM adm_def_chart_entry entry
LEFT OUTER JOIN adm_link boollnk ON boollnk."referenceId" = entry.id AND boollnk."typeId" = 1073
LEFT OUTER JOIN adm_link_value_bool boolval ON boolval."linkId" = boollnk.id
LEFT OUTER JOIN adm_link numlnk ON numlnk."referenceId" = entry.id AND numlnk."typeId" = 1074
LEFT OUTER JOIN adm_link_value_number numval ON numval."linkId" = numlnk.id
LEFT OUTER JOIN adm_link itmlnk ON itmlnk."referenceId" = entry.id AND itmlnk."typeId" = 1071
LEFT OUTER JOIN adm_link dicelnk ON dicelnk."referenceId" = entry.id AND dicelnk."typeId" = 1069
WHERE entry."chartId" = $1

$BODY$;

ALTER FUNCTION public.get_chart_entries(bigint)
    OWNER TO postgres;
