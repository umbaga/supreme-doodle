-- FUNCTION: public.get_charts(bigint)

-- DROP FUNCTION public.get_charts(bigint);

CREATE OR REPLACE FUNCTION public.get_charts(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(
	json_build_object(
		'id', chart.id,
		'columnCount', chart."columnCount",
		'rowCount', chart."rowCount",
		'type', get_item(chart."typeId"),
		'orderIndex', ord."orderIndex",
		'description', get_description(chart.id, 11),
		'title', get_description(chart.id, 1072),
		'dice', CASE WHEN get_dice(dicelnk."targetId") IS NULL THEN json_build_object('id', 0, 'dieCount', 0, 'dieType', 0, 'modifier', 0, 'multiplier', 1, 'divisor', 1, 'rendered', '') ELSE get_dice(dicelnk."targetId") END,
		'picklist', get_type(pklstlnk."targetId"),
		'columns', get_chart_columns(chart.id),
		'rows', get_chart_rows(chart.id),
		'entries', get_chart_entries(chart.id)
	)
)
FROM adm_link lnk
INNER JOIN adm_core_chart chart ON chart.id = lnk."targetId"
INNER JOIN adm_link_order ord ON ord."linkId" = lnk."id"
LEFT OUTER JOIN adm_link dicelnk ON dicelnk."referenceId" = lnk."targetId" AND dicelnk."typeId" = 1069
LEFT OUTER JOIN adm_link pklstlnk ON pklstlnk."referenceId" = lnk."targetId" AND pklstlnk."typeId" = 1070
WHERE lnk."referenceId" = $1

$BODY$;

ALTER FUNCTION public.get_charts(bigint)
    OWNER TO postgres;
