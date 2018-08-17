-- FUNCTION: public.get_assigned_equipment(bigint, bigint)

-- DROP FUNCTION public.get_assigned_equipment(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_assigned_equipment(
	"itemId" bigint,
	"linkTypeId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$
SELECT json_agg(
	json_build_object(
		'id', arri.id
		, 'name', arri."itemName"
		, 'cost', CASE WHEN eq."cost" IS NULL THEN 0 ELSE eq."cost" END
		, 'weight', CASE WHEN eq."weight" IS NULL THEN 0 ELSE eq."weight" END
		, 'unit', CASE WHEN unt."unit" IS NULL THEN '' ELSE unt."unit" END
		, 'count', CASE WHEN unt."count" IS NULL THEN 1 ELSE unt."count" END
		, 'assigned', lnkcnt."count"
		, 'category', CASE WHEN get_item(eq."categoryId") IS NULL THEN get_item(arri.id) ELSE get_item(eq."categoryId") END
	)
)
FROM adm_core_item i
INNER JOIN adm_link lnk ON lnk."referenceId" = i.id
INNER JOIN adm_core_item arri ON arri.id = lnk."targetId" AND lnk."typeId" = $2
LEFT OUTER JOIN adm_def_equipment eq ON eq."equipmentId" = lnk."targetId"
LEFT OUTER JOIN adm_def_equipment_unit unt ON unt."equipmentId" = i.id
INNER JOIN adm_link_count lnkcnt ON lnkcnt."linkId" = lnk.id
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_assigned_equipment(bigint, bigint)
    OWNER TO postgres;
